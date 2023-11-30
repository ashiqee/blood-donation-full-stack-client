import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, FreeMode, Navigation } from 'swiper/modules';
import SecTitle from '../../../Components/SectionTitle/SecTitle';

const OurVolunteer = () => {
    return (
        <div>
            <SecTitle title={'Our Volunteer'}></SecTitle>
            <div className="bg-fixed bg-cover h-[500] items-center "
                style={{ backgroundImage: 'url(https://ideas.baudville.com/wp-content/uploads/2023/10/MASTER-YOUR-ONBOARDING-PROCESS-WITH-OUR-LATEST-EBOOK-39.png)' }}>
                <div className=" bg-gradient-to-t p-20 from-red-50 bg-opacity-60">
                    <Swiper
                        slidesPerView={4}
                        freeMode={true}
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        // pagination={{
                        //   clickable: true,
                        // }}
                        // navigation={true}
                        modules={[Autoplay, Pagination, FreeMode, Navigation]}
                        className="mySwiper"
                    >
                        <div className='h-[300px]'>
                            <div>
                                <SwiperSlide>


                                    <img className='md:-w-56 md:h-56 h-32 p-1 rounded-2xl ' src="https://images.pexels.com/photos/6347743/pexels-photo-6347743.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                                </SwiperSlide>
                                <SwiperSlide><img className='md:-w-56 md:h-56 h-32  rounded-2xl'
                                    src="https://storage.googleapis.com/pai-images/b81cfa2588534987b6ca4e330f49623d.jpeg" alt="" />
                                </SwiperSlide>
                            </div>
                            <div>
                                <SwiperSlide><img className='md:w-56 md:h-56 h-32 rounded-2xl' src="https://storage.googleapis.com/pai-images/ba40c6c33f6a4fcf847042c63193c323.jpeg" alt="" /> </SwiperSlide>


                            </div>
                            <div>
                                <SwiperSlide>


                                    <img className='md:-w-56 md:h-56 h-32 p-1 rounded-2xl ' src="https://images.pexels.com/photos/6347743/pexels-photo-6347743.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                                </SwiperSlide>
                                <SwiperSlide><img className='md:-w-56 md:h-56 h-32  rounded-2xl'
                                    src="https://storage.googleapis.com/pai-images/b81cfa2588534987b6ca4e330f49623d.jpeg" alt="" />
                                </SwiperSlide>
                            </div>
                            <div>
                                <SwiperSlide><img className='w-56 md:h-56 h-32 rounded-2xl' src="https://storage.googleapis.com/pai-images/ba40c6c33f6a4fcf847042c63193c323.jpeg" alt="" /> </SwiperSlide>


                            </div>
                        </div>

                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default OurVolunteer;