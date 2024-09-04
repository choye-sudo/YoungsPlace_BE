import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ApiService {
  private readonly API_KEY = 'wo5vMbPOCDC1YYlaKOju6ti8hUWwtmqPcftYO0SxdasO6SQncoeIYFyky1k5wKKQX3+gpmv/HZqp4a+7O4Kq1Q==';
  private readonly BASE_URL = 'http://apis.data.go.kr/B552555';

  constructor(private prisma: PrismaService) {}

  async updateComplexInformation() {
    try {
      // 1. 분양임대공고문 조회 서비스 호출
      const leaseNoticeResponse = await axios.get(`${this.BASE_URL}/lhLeaseNoticeInfo1`, {
        params: {
          serviceKey: this.API_KEY,
          PG_SZ: '100', // 페이지 사이즈: 한 페이지 결과 수
          PAGE: '1', // 페이지 번호
          PAN_ST_DT: '20230101', // 게시일 검색 시작일
          PAN_ED_DT: '20231231', // 게시일 검색 종료일
        },
      });

      for (const notice of leaseNoticeResponse.data.dsSch) {
        const complexName = notice.SBD_LGO_NM;

        // 2. 분양임대공고별 공급정보 조회 서비스 호출
        const supplyInfoResponse = await axios.get(`${this.BASE_URL}/lhLeaseNoticeSplInfo1`, {
          params: {
            serviceKey: this.API_KEY,
            SPL_INF_TP_CD: notice.SPL_INF_TP_CD,
            CCR_CNNT_SYS_DS_CD: notice.CCR_CNNT_SYS_DS_CD,
            PAN_ID: notice.PAN_ID,
            UPP_AIS_TP_CD: notice.UPP_AIS_TP_CD,
          },
        });

        for (const supplyInfo of supplyInfoResponse.data.dsList01) {
          // ComplexInformation 테이블 업데이트 또는 삽입
          await this.prisma.complexInformation.upsert({
            where: { complex_name: complexName },
            update: {
              province: this.extractProvince(supplyInfo.CTRT_PLC_ADR),
              city: this.extractCity(supplyInfo.CTRT_PLC_ADR),
              address: supplyInfo.CTRT_PLC_ADR,
              household_number: supplyInfo.HSH_CNT,
              heating_system: supplyInfo.HTN_FMLA_DESC,
            },
            create: {
              complex_name: complexName,
              province: this.extractProvince(supplyInfo.CTRT_PLC_ADR),
              city: this.extractCity(supplyInfo.CTRT_PLC_ADR),
              address: supplyInfo.CTRT_PLC_ADR,
              household_number: supplyInfo.HSH_CNT,
              heating_system: supplyInfo.HTN_FMLA_DESC,
            },
          });

          // ComplexTypeInformation 테이블 업데이트 또는 삽입
          await this.prisma.complexTypeInformation.upsert({
            where: {
              complex_name_complex_type_name: {
                complex_name: complexName,
                complex_type_name: supplyInfo.HTY_NNA,
              },
            },
            update: {
              exclusive_area: supplyInfo.DDO_AR || null,
              supply_area: supplyInfo.SPL_AR || null,
              deposit: supplyInfo.LS_GMY || null,
              rent: supplyInfo.RFE || null,
            },
            create: {
              complex_name: complexName,
              complex_type_name: supplyInfo.HTY_NNA,
              exclusive_area: supplyInfo.DDO_AR || null,
              supply_area: supplyInfo.SPL_AR || null,
              deposit: supplyInfo.LS_GMY || null,
              rent: supplyInfo.RFE || null,
            },
          });
        }

        // 3. 분양임대공고별 상세정보 조회 서비스 호출
        const detailInfoResponse = await axios.get(`${this.BASE_URL}/lhLeaseNoticeDtlInfo1`, {
          params: {
            serviceKey: this.API_KEY,
            SPL_INF_TP_CD: notice.SPL_INF_TP_CD,
            CCR_CNNT_SYS_DS_CD: notice.CCR_CNNT_SYS_DS_CD,
            PAN_ID: notice.PAN_ID,
            UPP_AIS_TP_CD: notice.UPP_AIS_TP_CD,
          },
        });

        for (const detailInfo of detailInfoResponse.data.dsSplScdl) {
          // SubscriptionInformation 테이블 업데이트 또는 삽입
          await this.prisma.subscriptionInformation.upsert({
            where: {
              complex_name: complexName,
            },
            update: {
              subscription_name: detailInfo.PAN_NM || null,
              household_number_now: detailInfo.NOW_HSH_CNT || null,
              start_date: detailInfo.SBSC_ACP_ST_DT || null,
              end_date: detailInfo.SBSC_ACP_CLSG_DT || null,
              estimated_month: detailInfo.MVIN_XPC_YM || null,
              recruitment_status: detailInfo.PAN_SS || null,
              notification: detailInfo.SIL_OFC_GUD_FCTS || null,
              subscription_URL: detailInfo.DTL_URL || null,
            },
            create: {
              complex_name: complexName,
              subscription_name: detailInfo.PAN_NM || null,
              household_number_now: detailInfo.NOW_HSH_CNT || null,
              start_date: detailInfo.SBSC_ACP_ST_DT || null,
              end_date: detailInfo.SBSC_ACP_CLSG_DT || null,
              estimated_month: detailInfo.MVIN_XPC_YM || null,
              recruitment_status: detailInfo.PAN_SS || null,
              notification: detailInfo.SIL_OFC_GUD_FCTS || null,
              subscription_URL: detailInfo.DTL_URL || null,
            },
          });
        }
      }
    } catch (error) {
      console.error('Error updating complex information:', error);
    }
  }

  // Helper functions to extract province and city from address
  private extractProvince(address: string): string {
    const parts = address.split(' ');
    return parts[0] || '';
  }

  private extractCity(address: string): string {
    const parts = address.split(' ');
    return parts[1] || '';
  }
}
