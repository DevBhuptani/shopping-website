import Image from 'next/image';
import shopData from '@/utils/data/data.json';
import Link from 'next/link';
import React from 'react';

const MainPage = () => {
  return (
    <main>
      <div className="mx-auto max-w-6xl">
        <div>
          <h1 className="leading-relaxed font-primary font-extrabold text-4xl text-center text-palette-primary mt-4 py-2 sm:py-4">
            Transform Your Home with Quality Essentials
          </h1>
          <p className="max-w-xl text-center px-2 mx-auto text-base text-gray-600">
            Discover a wide range of household items to enhance your living
            space
          </p>
        </div>

        <div className="py-12 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
          {shopData.map((data) => {
            return (
              <React.Fragment key={data?.id}>
                <Link
                  href={`/products/${data?.asin}`}
                  className="h-120 w-72 rounded shadow-lg mx-auto border border-palette-lighter"
                >
                  <div className="h-72 border-b-2 border-palette-lighter relative">
                    <div
                      style={{
                        display: 'block',
                        overflow: 'hidden',
                        position: 'absolute',
                        inset: '0px',
                        boxSizing: 'border-box',
                        margin: '0px',
                      }}
                    >
                      <Image
                        src={data?.product_photo}
                        alt={data?.product_title}
                        priority
                        className="transform duration-500 ease-in-out hover:scale-110"
                        width={32}
                        height={32}
                        style={{
                          position: 'absolute',
                          inset: '0px',
                          boxSizing: 'border-box',
                          padding: '0px',
                          border: 'none',
                          margin: 'auto',
                          display: 'block',
                          width: '0px',
                          height: '0px',
                          minHeight: '100%',
                          minWidth: '100%',
                          maxHeight: '100%',
                          maxWidth: '100%',
                        }}
                      />
                    </div>
                  </div>

                  <div className="h-48 relative">
                    <div className="font-primary text-palette-primary text-2xl pt-4 px-4 font-semibold">
                      {data?.product_title?.length > 30
                        ? data?.product_title?.slice(0, 30)
                        : data?.product_title}
                      ...
                    </div>
                    <div className="text-palette-dark font-primary font-medium text-base absolute bottom-0 right-0 mb-4 pl-8 pr-4 pb-1 pt-2 bg-palette-lighter rounded-tl-sm triangle">
                      <span className="text-lg">{data?.product_price}</span>
                    </div>
                  </div>
                </Link>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default MainPage;
