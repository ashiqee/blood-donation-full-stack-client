import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import ButtonCom from '../../Button/ButtonCom';
import { Button } from '@mui/material';
import { RiKnifeBloodFill } from 'react-icons/ri';
import { BloodtypeOutlined } from '@mui/icons-material';


const Banner = () => {
  return <div style={{ backgroundImage: 'url(https://i.gifer.com/SOHy.gif)' }}
    className='grid bg-cover bg-opacity-100 grid-cols-1  md:grid-cols-2 gap-0 h-[650px] items-center   
  
  transform'>
    <div className='text-center  mx-auto'>
      <div>  <img className='w-48 relative z-0 bottom-0 -top-10 -right-10' src="https://www.cpsmumbai.org/Uploads/2762023161833920.png" alt="" /></div>
      <div className='flex gap-5  h-17 justify-center items-center'>
        <div>
          <Button variant='contained' sx={{ bgcolor: "secondary.main", color: "white" }}> Join as a donor </Button>
        </div>
        <div>
          <ButtonCom text={'Search Donors'} />
        </div>
      </div>
    </div>

    < div className='' >
      <Swiper
        spaceBetween={30}
        // centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        // }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <div className='h-[300px]'>
          <div>
            <SwiperSlide>

              <div className='text-2xl text-white mx-5'>
                <BloodtypeOutlined sx={{ fontSize: '40px', textAlign: 'center' }} />
                <h2 className='' > সম্মানিত স্বেচ্ছা রক্তদাতা, আপনাকে অভিনন্দন।
                  আপনার জন্যেই এটা সম্ভব হয়েছে। ২০০০ সালে</h2>
                <br />আমাদের দেশে প্রয়োজনীয় রক্তের ৪৭%-ই আসত পেশাদার রক্তদাতাদের কাছ থেকে।
                <br />
                <br />২০১১ সালে তা কমে আসে ২০-২৫% এ।
              </div>
              {/* <img className='w-full p-1 rounded-l-full  ' src="https://eadn-wc01-10223060.nxedge.io/wp-content/uploads/2023/08/Engaging-and-Converting-Followers.jpg" alt="" /> */}
            </SwiperSlide>
            {/* <SwiperSlide><img className='w-full  rounded-full'
              src="https://media1.giphy.com/media/hQzcnks5Gq8DhIS5F1/giphy.gif" alt="" />
            </SwiperSlide> */}
          </div>
          <div>
            <SwiperSlide><img className='w-80 mx-auto md:w-96 ' src="https://files.quantummethod.org.bd/resize/300/-/media/image/static_content/blood_site_save_blood_text_20210502.png" alt="" /> </SwiperSlide>


          </div>
        </div>

      </Swiper>
    </div >

  </div >;
};

export default Banner;
