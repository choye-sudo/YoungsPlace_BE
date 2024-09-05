import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from './prisma.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ApiService {
  private readonly API_KEY = 'wo5vMbPOCDC1YYlaKOju6ti8hUWwtmqPcftYO0SxdasO6SQncoeIYFyky1k5wKKQX3+gpmv/HZqp4a+7O4Kq1Q==';
  private readonly BASE_URL = 'http://apis.data.go.kr/B552555';

  constructor(private prisma: PrismaService) {}

  async fetchAllData(startDate: string, endDate: string) {
    let page = 1;
    let hasMoreData = true;

    while (hasMoreData) {
      const url = `${this.BASE_URL}/lhLeaseNoticeInfo1/lhLeaseNoticeInfo1`;
      const params = {
        serviceKey: this.API_KEY,
        PG_SZ: '100', // 한 페이지에 100개의 데이터를 가져옴
        PAGE: page,   // 페이지 번호
        PAN_ST_DT: startDate, // 검색 시작일
        PAN_ED_DT: endDate,   // 검색 종료일
      };

      console.log('Sending request to API:', url);
      console.log('Request parameters:', params);

      try {
        const leaseNoticeResponse = await axios.get(url, { params });

        console.log('API response status:', leaseNoticeResponse.status);
        console.log('API response data:', leaseNoticeResponse.data);

        // leaseNoticeResponse의 데이터가 존재하는지 확인
        if (!leaseNoticeResponse.data || !leaseNoticeResponse.data.dsSch || leaseNoticeResponse.data.dsSch.length === 0) {
          console.log(`No more data found on page ${page}`);
          hasMoreData = false;
        } else {
          for (const notice of leaseNoticeResponse.data.dsSch) {
            const complexName = notice.SBD_LGO_NM;

            // 2. 분양임대공고별 공급정보 조회 서비스 호출 (행복주택만 필터링)
            if (notice.SPL_INF_TP_CD === '063') {  // 행복주택인 경우만 진행
              const supplyInfoUrl = `${this.BASE_URL}/lhLeaseNoticeSplInfo1/getLeaseNoticeSplInfo1`;
              const supplyInfoParams = {
                serviceKey: this.API_KEY,
                SPL_INF_TP_CD: notice.SPL_INF_TP_CD,
                CCR_CNNT_SYS_DS_CD: notice.CCR_CNNT_SYS_DS_CD,
                PAN_ID: notice.PAN_ID,
                UPP_AIS_TP_CD: notice.UPP_AIS_TP_CD,
              };

              console.log('Sending request to API:', supplyInfoUrl);
              console.log('Request parameters:', supplyInfoParams);

              const supplyInfoResponse = await axios.get(supplyInfoUrl, { params: supplyInfoParams });

              console.log('API response status:', supplyInfoResponse.status);
              console.log('API response data:', supplyInfoResponse.data);

              // supplyInfoResponse의 데이터가 존재하는지 확인
              if (!supplyInfoResponse.data || !supplyInfoResponse.data.dsList01) {
                console.log(`No supply information found for complex: ${complexName}`);
                continue;
              }

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
              const detailInfoUrl = `${this.BASE_URL}/lhLeaseNoticeDtlInfo1/getLeaseNoticeDtlInfo1`;
              const detailInfoParams = {
                serviceKey: this.API_KEY,
                SPL_INF_TP_CD: notice.SPL_INF_TP_CD,
                CCR_CNNT_SYS_DS_CD: notice.CCR_CNNT_SYS_DS_CD,
                PAN_ID: notice.PAN_ID,
                UPP_AIS_TP_CD: notice.UPP_AIS_TP_CD,
              };

              console.log('Sending request to API:', detailInfoUrl);
              console.log('Request parameters:', detailInfoParams);

              const detailInfoResponse = await axios.get(detailInfoUrl, { params: detailInfoParams });

              console.log('API response status:', detailInfoResponse.status);
              console.log('API response data:', detailInfoResponse.data);

              // detailInfoResponse의 데이터가 존재하는지 확인
              if (!detailInfoResponse.data || !detailInfoResponse.data.dsSplScdl) {
                console.log(`No detail information found for complex: ${complexName}`);
                continue;
              }

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
            } else {
              console.log(`Skipping non-happy housing complex: ${complexName}`);
            }
          }
          page++;  // 다음 페이지로 이동
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Axios error details:', error.toJSON());
        } else {
          console.error('Unknown error:', error);
        }
        hasMoreData = false; // 에러 발생 시 반복 종료
      }
    }
  }

  // 매주 일요일 자정(00:00)에 실행되도록 크론 표현식을 수정
  @Cron('0 0 * * 0')
  async fetchWeeklyData() {
    const now = new Date();
    const lastWeek = new Date(now);
    lastWeek.setDate(now.getDate() - 7);

    const endDate = this.formatDate(now);
    const startDate = this.formatDate(lastWeek);

    await this.fetchAllData(startDate, endDate);
  }

  private extractProvince(address: string): string {
    const parts = address.split(' ');
    return parts[0] || '';
  }

  private extractCity(address: string): string {
    const parts = address.split(' ');
    return parts[1] || '';
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    return `${year}${month}${day}`;
  }
}
