-- CreateTable
CREATE TABLE "ComplexInformation" (
    "complex_name" VARCHAR(50) NOT NULL,
    "province" VARCHAR(100),
    "city" VARCHAR(100),
    "address" VARCHAR(100),
    "household_number" VARCHAR(10),
    "heating_system" VARCHAR(20),
    "house_type" VARCHAR(10),
    "elevator" VARCHAR(10),
    "rental_business_operator" VARCHAR(10),
    "parkinglot_number" VARCHAR(10),
    "building_shape" VARCHAR(20),
    "building_completion_date" VARCHAR(20),

    CONSTRAINT "ComplexInformation_pkey" PRIMARY KEY ("complex_name")
);

-- CreateTable
CREATE TABLE "ComplexTypeInformation" (
    "complex_name" VARCHAR(50) NOT NULL,
    "complex_type_name" VARCHAR(10) NOT NULL,
    "exclusive_area" VARCHAR(10),
    "common_area" VARCHAR(10),
    "supply_area" VARCHAR(20),
    "deposit" VARCHAR(20),
    "rent" VARCHAR(20),
    "conversion_deposit" VARCHAR(10),

    CONSTRAINT "ComplexTypeInformation_pkey" PRIMARY KEY ("complex_name","complex_type_name")
);

-- CreateTable
CREATE TABLE "SubscriptionInformation" (
    "complex_name" VARCHAR(50) NOT NULL,
    "subscription_name" VARCHAR(50),
    "household_number_now" VARCHAR(10),
    "start_date" VARCHAR(10),
    "end_date" VARCHAR(10),
    "estimated_month" VARCHAR(100),
    "recruitment_status" VARCHAR(10),
    "notification" VARCHAR(4000),
    "subscription_URL" VARCHAR(100),

    CONSTRAINT "SubscriptionInformation_pkey" PRIMARY KEY ("complex_name")
);

-- AddForeignKey
ALTER TABLE "ComplexTypeInformation" ADD CONSTRAINT "ComplexTypeInformation_complex_name_fkey" FOREIGN KEY ("complex_name") REFERENCES "ComplexInformation"("complex_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionInformation" ADD CONSTRAINT "SubscriptionInformation_complex_name_fkey" FOREIGN KEY ("complex_name") REFERENCES "ComplexInformation"("complex_name") ON DELETE RESTRICT ON UPDATE CASCADE;
