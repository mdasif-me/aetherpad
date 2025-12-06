const markers = Array.from({ length: 83 }, (_, i) => i);

export default function Ruler() {
  return (
    <div className='h-6 border-b border-gray-300 items-end relative select-none print:hidden'>
      <div
        id='ruler-container'
        className='max-w-[816px] w-full mx-auto h-full relative'
      >
        <div className='absolute inset-x-0 bottom-0 h-full'>
          <div className='relative h-full w-[816px]'>
            {markers.map((marker) => {
              const position = (marker * 816) / 82;
              return (
                <div
                  key={marker}
                  className='absolute bottom-0'
                  style={{ left: `${position}px` }}
                >
                  {marker % 10 === 0 && (
                    <>
                      <div className='absolute bottom-0 w-[1px] h-2 bg-neutral-500' />
                      <span className='absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2'>
                        {marker / 10 + 1}
                      </span>
                    </>
                  )}
                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <div className='absolute bottom-0 w-[1px] h-1.5 bg-neutral-500' />
                  )}
                  {marker % 5 !== 0 && (
                    <div className='absolute bottom-0 w-[1px] h-1 bg-neutral-500' />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
