import React from 'react';
// import gsap from 'gsap';

const LoadingScreen = () => {
  // useEffect(() => {
  //   const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

  //   tl.to('.circle', {
  //     scale: 1.2,
  //     duration: 0.5,
  //     ease: 'power1.inOut',
  //     stagger: 0.2
  //   })
  //     .to('.text', {
  //       color: '#2563EB',
  //       duration: 0.5,
  //       ease: 'power1.inOut',
  //     }, 0)
  //     .to('.circle', {
  //       scale: 1,
  //       duration: 0.5,
  //       ease: 'power1.inOut',
  //       stagger: 0.2
  //     })
  //     .to('.text', {
  //       color: '#1F2937',
  //       duration: 0.5,
  //       ease: 'power1.inOut',
  //     }, 1);
  // }, []);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-200">
      <div className="mb-4 text-4xl font-bold text-center text-gray-800 text-opacity-80 text">
        Loading...
      </div>
      <div className="flex space-x-4">
        <div className="circle h-12 w-12 bg-blue-500 rounded-full"></div>
        <div className="circle h-12 w-12 bg-red-500 rounded-full"></div>
        <div className="circle h-12 w-12 bg-green-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
