import React from "react";

export default function CategoryChips() {
  return (
    <div className="flex flex-col items-start overflow-clip px-16 pb-16 pt-0 relative w-full z-[1]">
      <div className="flex gap-[8px] items-start justify-center relative w-full">
        <OfferingCard
          title={
            <>
              <p className="leading-[20px] mb-0">Arjuna NEET</p>
              <p className="leading-[20px]">2026</p>
            </>
          }
          icon="/assets/medical.svg"
          badgeText="Now @ ₹4,699 "
        />
        <OfferingCard
          title={
            <>
              <p className="leading-[20px] mb-0">Power</p>
              <p className="leading-[20px]">Batch</p>
            </>
          }
          icon="/assets/thunderbolt.svg"
          badgeText="Now @ ₹4,699 "
        />
        <OfferingCard
          title={
            <>
              <p className="leading-[20px] mb-0">Test</p>
              <p className="leading-[20px]">Series</p>
            </>
          }
          icon={<TestSeriesIcon />}
          badgeText="Now @ ₹5,000 "
        />
      </div>
    </div>
  );
}

function TestSeriesIcon() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[36px]">
      <div className="overflow-clip relative shrink-0 size-[28px]">
        <div className="absolute bottom-[1.56%] left-[9.38%] right-1/4 top-[10.94%]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/test_series/vector0.svg" />
        </div>
        <div className="absolute inset-[10.94%_44.41%_1.56%_9.38%]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/test_series/vector1.svg" />
        </div>
        <div className="absolute inset-[65.63%_1.56%_28.13%_89.06%]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/test_series/vector2.svg" />
        </div>
        <div className="absolute bottom-[34.38%] left-[93.75%] right-[1.56%] top-1/4">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/test_series/vector3.svg" />
        </div>
        <div className="absolute bottom-3/4 left-[89.06%] right-[1.56%] top-[15.63%]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/test_series/vector4.svg" />
        </div>
        <div className="absolute bottom-3/4 left-[89.06%] right-[1.56%] top-[15.63%]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/test_series/vector5.svg" />
        </div>
        <div className="absolute inset-[71.88%_1.56%_20.31%_89.06%]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/test_series/vector6.svg" />
        </div>
        <div className="absolute bottom-[34.38%] left-[89.06%] right-[6.25%] top-1/4">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/test_series/vector7.svg" />
        </div>
        <div className="absolute inset-[10.53%_12.5%_1.56%_64.06%]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/test_series/vector8.svg" />
        </div>
        <div className="absolute inset-[1.56%_20.98%_89.06%_18.75%]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/test_series/vector9.svg" />
        </div>
        <div className="absolute bottom-[1.56%] left-[64.06%] right-1/4 top-[87.5%]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/test_series/vector10.svg" />
        </div>
        <div className="absolute inset-[23.44%_34.38%_65.63%_54.69%]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/test_series/vector11.svg" />
        </div>
        <div className="absolute inset-[18.75%_29.69%_26.56%_14.06%]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/test_series/vector12.svg" />
        </div>
        <div className="absolute inset-[21.89%_31.27%_68.75%_57.35%]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/test_series/vector13.svg" />
        </div>
        <div className="absolute inset-[-0.01%_0_0_7.81%]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/test_series/vector14.svg" />
        </div>
      </div>
    </div>
  );
}

function OfferingCard({
  title,
  icon,
  badgeText,
}: {
  title: React.ReactNode;
  icon: string | React.ReactNode;
  badgeText: string;
}) {
  return (
    <div className="bg-[#f4fcf8] flex flex-col gap-0 h-[124px] items-center relative rounded-xl w-[104px] shrink-0">
      <div className="flex flex-1 flex-col gap-[10px] items-center min-h-px overflow-clip pb-16 pt-12 relative rounded-xl w-full">
        <div className="-translate-x-1/2 absolute h-[193px] left-1/2 top-[5px] w-[186px]">
          <img
            alt=""
            className="block max-w-none w-full h-full absolute inset-0 m-auto object-contain"
            style={{ width: '93.82%', height: '94.16%' }}
            src="/assets/star32.svg"
          />
        </div>
        <div className="relative shrink-0 w-[36px] h-[36px]">
          {typeof icon === "string" ? (
            <img
              alt=""
              className="absolute block inset-0 max-w-none w-full h-full"
              src={icon}
            />
          ) : (
            icon
          )}
        </div>
        <div className="flex flex-col font-semibold h-[40px] justify-center leading-none min-w-full relative shrink-0 text-[14px] text-[#3d3d3d] text-center w-min">
          {title}
        </div>
        <div className="absolute bg-[#079f4a] bottom-0 flex items-center justify-center -left-[2px] px-[10px] right-0">
          <p className="font-semibold leading-[16px] text-[10px] text-white whitespace-nowrap">
            {badgeText}
          </p>
        </div>
      </div>
    </div>
  );
}
