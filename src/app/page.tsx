// import Image from 'next/image';

export default function Home() {
  return (
    // เริ่มสร้างโครงสร้าง section ต่างๆ ตาม index.html โดยใช้ Tailwind
    <>
      {/* Section 1: Hero Banner */}
      <section
        className='bg-cover bg-no-repeat pt-20' // Tailwind classes for background
        style={{ backgroundImage: "url('/images/banner-1.jpg')" }} // Inline style for background image path
      >
        <div className='container-lg mx-auto px-4'>
          <div className='grid grid-cols-1 lg:grid-cols-2'>
            <div className='pt-10 mt-5'>
              <h2 className='text-6xl md:text-7xl lg:text-8xl leading-tight ls-1'>
                {' '}
                {/* Responsive text size */}
                <span className='font-bold text-primary'>Organic</span> Foods at
                your <span className='font-bold text-gray-800'>Doorsteps</span>
              </h2>
              <p className='text-xl text-gray-600 mt-4'>
                Dignissim massa diam elementum.
              </p>
              <div className='flex flex-col sm:flex-row gap-3 mt-6'>
                <a
                  href='#'
                  className='btn btn-primary bg-primary hover:bg-green-700 text-white uppercase text-sm rounded-full px-6 py-3'
                >
                  Start Shopping
                </a>
                <a
                  href='#'
                  className='btn btn-dark bg-secondary hover:bg-gray-800 text-white uppercase text-sm rounded-full px-6 py-3'
                >
                  Join Now
                </a>
              </div>
              {/* Stats Section */}
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 my-12 text-gray-800'>
                <div className='flex items-center'>
                  <p className='text-4xl lg:text-5xl font-bold leading-none mr-2'>
                    14k+
                  </p>
                  <p className='text-xs uppercase leading-tight'>
                    Product Varieties
                  </p>
                </div>
                <div className='flex items-center'>
                  <p className='text-4xl lg:text-5xl font-bold leading-none mr-2'>
                    50k+
                  </p>
                  <p className='text-xs uppercase leading-tight'>
                    Happy Customers
                  </p>
                </div>
                <div className='flex items-center'>
                  <p className='text-4xl lg:text-5xl font-bold leading-none mr-2'>
                    10+
                  </p>
                  <p className='text-xs uppercase leading-tight'>
                    Store Locations
                  </p>
                </div>
              </div>
            </div>
            {/* Optional: Add the other column if needed */}
          </div>

          {/* Feature Cards Section */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 -mx-0 lg:-mb-1'>
            {' '}
            {/* Negative margin for overlap effect */}
            <div className='bg-primary text-white p-4 '>
              <div className='flex items-center'>
                <div className='w-1/4 text-center'>
                  <svg
                    width='60'
                    height='60'
                  >
                    <use xlinkHref='#fresh'></use>
                  </svg>
                </div>
                <div className='w-3/4 pl-3'>
                  <h5 className='font-semibold text-lg'>Fresh from farm</h5>
                  <p className='text-sm font-light'>
                    Lorem ipsum dolor sit amet, consectetur adipi elit.
                  </p>
                </div>
              </div>
            </div>
            <div className='bg-secondary text-white p-4'>
              <div className='flex items-center'>
                <div className='w-1/4 text-center'>
                  <svg
                    width='60'
                    height='60'
                  >
                    <use xlinkHref='#organic'></use>
                  </svg>
                </div>
                <div className='w-3/4 pl-3'>
                  <h5 className='font-semibold text-lg'>100% Organic</h5>
                  <p className='text-sm font-light'>
                    Lorem ipsum dolor sit amet, consectetur adipi elit.
                  </p>
                </div>
              </div>
            </div>
            <div className='bg-danger text-white p-4'>
              <div className='flex items-center'>
                <div className='w-1/4 text-center'>
                  <svg
                    width='60'
                    height='60'
                  >
                    <use xlinkHref='#delivery'></use>
                  </svg>
                </div>
                <div className='w-3/4 pl-3'>
                  <h5 className='font-semibold text-lg'>Free delivery</h5>
                  <p className='text-sm font-light'>
                    Lorem ipsum dolor sit amet, consectetur adipi elit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- เพิ่ม Section อื่นๆ ต่อจากนี้ --- */}
      {/* Section 2: Category Carousel (สร้าง Component แยก) */}
      {/* <CategoryCarousel /> */}

      {/* Section 3: Best Selling Products (สร้าง Component แยก) */}
      {/* <ProductGrid title="Best selling products" /> */}

      {/* Section 4: Banner Blocks (สร้าง Component แยก) */}
      {/* <BannerAdSection /> */}

      {/* Section 5: Featured Products (สร้าง Component แยก) */}
      {/* <ProductCarousel title="Featured products" /> */}

      {/* Section 6: Newsletter Signup (สร้าง Component แยก) */}
      {/* <NewsletterSignup /> */}

      {/* Section 7: Popular Products (สร้าง Component แยก) */}
      {/* <ProductCarousel title="Most popular products" /> */}

      {/* Section 8: Latest Blog (สร้าง Component แยก) */}
      {/* <LatestBlog /> */}

      {/* Section 9: Download App (สร้าง Component แยก) */}
      {/* <DownloadApp /> */}

      {/* Section 10: People are looking for (สร้าง Component แยก) */}
      {/* <PopularSearches /> */}

      {/* Section 11: Features/Info cards (สร้าง Component แยก) */}
      {/* <FeatureInfoSection /> */}
    </>
  );
}
