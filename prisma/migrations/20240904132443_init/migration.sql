-- CreateTable
CREATE TABLE "ComplexInformation" (
    "complex_name" VARCHAR(100) NOT NULL,
    "province" VARCHAR(200),
    "city" VARCHAR(200),
    "address" VARCHAR(200),
    "household_number" VARCHAR(20),
    "heating_system" VARCHAR(40),
    "house_type" VARCHAR(20),
    "elevator" VARCHAR(20),
    "rental_business_operator" VARCHAR(20),
    "parkinglot_number" VARCHAR(20),
    "building_shape" VARCHAR(40),
    "building_completion_date" VARCHAR(40),

    CONSTRAINT "ComplexInformation_pkey" PRIMARY KEY ("complex_name")
);

-- CreateTable
CREATE TABLE "ComplexTypeInformation" (
    "complex_name" VARCHAR(100) NOT NULL,
    "complex_type_name" VARCHAR(20) NOT NULL,
    "exclusive_area" VARCHAR(20),
    "common_area" VARCHAR(20),
    "supply_area" VARCHAR(40),
    "deposit" VARCHAR(40),
    "rent" VARCHAR(40),
    "conversion_deposit" VARCHAR(20),

    CONSTRAINT "ComplexTypeInformation_pkey" PRIMARY KEY ("complex_name","complex_type_name")
);

-- CreateTable
CREATE TABLE "SubscriptionInformation" (
    "complex_name" VARCHAR(100) NOT NULL,
    "subscription_name" VARCHAR(100),
    "household_number_now" VARCHAR(20),
    "start_date" VARCHAR(20),
    "end_date" VARCHAR(20),
    "estimated_month" VARCHAR(200),
    "recruitment_status" VARCHAR(20),
    "notification" VARCHAR(5000),
    "subscription_URL" VARCHAR(200),

    CONSTRAINT "SubscriptionInformation_pkey" PRIMARY KEY ("complex_name")
);

-- AddForeignKey
ALTER TABLE "ComplexTypeInformation" ADD CONSTRAINT "ComplexTypeInformation_complex_name_fkey" FOREIGN KEY ("complex_name") REFERENCES "ComplexInformation"("complex_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionInformation" ADD CONSTRAINT "SubscriptionInformation_complex_name_fkey" FOREIGN KEY ("complex_name") REFERENCES "ComplexInformation"("complex_name") ON DELETE RESTRICT ON UPDATE CASCADE;
