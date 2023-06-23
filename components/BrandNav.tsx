import React, { useEffect, useState } from 'react';
import graphRequest from '@/utils/graphql';
import Image from 'next/image';
import Link from 'next/link';

type Brands = {
  name: string
  link: string
  regularLogo: {
    asset: {
      url: string,
      metadata?: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
  }
  whiteLogo: {
    asset: {
      url: string
      metadata: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
  }
}

const BrandNav = ({whiteLogo} :{whiteLogo?: boolean}) => {
    const [brands, setBrands] = useState<Brands[] | []>([]);
    const [showBrands, setShowBrands] = useState(false);
    useEffect(() => {
        if(brands.length === 0){
          const getBrands = async () => {
            const brandsQuery = `{
              allBrands (sort: {orderRank: ASC}){
                name,
                link,
                regularLogo{
                  asset{
                    url,
                    metadata{
                      dimensions{
                          width,
                          height
                      }
                    }
                  }
                },
                whiteLogo{
                  asset{
                    url,
                    metadata{
                      dimensions{
                          width,
                          height
                      }
                    }
                  }
                }
              }
            }`
            const {data: { allBrands }} = await graphRequest(brandsQuery, 'lithion')  
            setBrands(allBrands.filter((brand: Brands) => brand.name !== 'Gridbox'))
          }
            getBrands()
        }
      }, [brands])

    return (
        <div className="absolute md:relative inset-5 md:inset-auto">
            <button className='relative h-full md:ml-5' onClick={() => setShowBrands(!showBrands)}>
                <Image
                    src={whiteLogo ? "/lithion-star-white.png" : "/lithion-star.png"}
                    alt="Brand Navigation"
                    width={50}
                    height={50}

                />
            </button>
            {
                showBrands &&
                <div className={`md:absolute fixed left-0 md:left-auto top-0 md:top-auto z-10 md:w-auto w-screen h-screen md:h-auto px-10 md:pb-10 bg-secondary md:bg-primary flex flex-col items-center justify-center space-y-16 md:space-y-10`}>
                  <button
                    className='absolute top-5 right-5 block md:hidden'
                    onClick={()=> setShowBrands(false)}
                  >
                    <svg className='fill-black' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width={16}><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
                  </button>
                    {   brands.length > 0 &&
                        brands?.map((brand:Brands) => {
                            const logoType = whiteLogo ? 'whiteLogo' : 'regularLogo'
                            return(
                              <Link
                                  key={brand.name}
                                  href={brand.link}
                                  className={`w-40 relative md:grayscale md:opacity-50 hover:opacity-100 hover:grayscale-0`}
                              >
                                  <Image
                                      src={brand[logoType]!.asset.url}
                                      alt={brand.name}
                                      width={brand[logoType].asset.metadata?.dimensions.width}
                                      height={brand[logoType].asset.metadata?.dimensions.height}
                                  />
                              </Link>
                            )
                        })
                    }
                </div>
            }
        </div>
    );
}

export default BrandNav;