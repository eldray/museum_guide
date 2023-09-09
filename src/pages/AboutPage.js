
import React from 'react';
import founder from '../components/images/founder.jpg';
import cover from '../components/images/cover.jpg';

import team1 from '../components/images/team1.jpg';
import team2 from '../components/images/team2.jpg'; 
import team3 from '../components/images/team3.jpg'; 
import team4 from '../components/images/team4.png'; 


const AboutPage = () => {
  return (
    <div className="py-12">

      <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-red-500 my-4 text-center">About ArtVoyage</h2>
        <div className="rounded-lg overflow-hidden">
          <img
            src={cover}
            alt="company"
            className="w-full h-96 object-cover"
          />
        </div>

        <p className="text-gray-600 mb-2">Established: August, 2023</p>
        <p className="text-gray-600 mb-4">Location: Kumasi, Ghana</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="text-gray-600">
            {/* Rest of the content */}
            <p className="text-gray-600 mb-4">
              ArtVoyage is an Interactive Museum Guide and Digital Art Gallery platform that allows museum visitors to explore exhibits and artworks while providing a space for artists to showcase and sell their digital creations.
            </p>
            <p className="text-gray-600 mb-4">
              We are dedicated to showcasing and promoting digital artworks from around the world. Our journey began in 2023 with a vision to provide a platform for both established and emerging digital artists to exhibit and sell their creations.
            </p>
            <p className="text-gray-600 mb-4">
              We believe in the power of digital art to inspire, provoke thought, and challenge conventions. Our services encompass a wide range of artistic styles and forms, from intricate digital paintings to mesmerizing generative art.
            </p>
            <p className="text-gray-600 mb-4">
              At ArtVoyage, our mission is to bridge the gap between artists and art enthusiasts, fostering a vibrant community where creativity knows no boundaries. We invite you to embark on a visual journey through the digital realm, exploring the diverse landscapes of imagination and innovation.
            </p>
            <p className="text-gray-600">
              Join us in celebrating the boundless possibilities of digital art!. <a href="/register"> Sign Up as User</a> and enjoy our wide range of artworks, exhibits and everything about art. <a href="/register"> Sign Up as an Artist </a> and let the world see the captivating artworks of yours that they are missing.
            </p>
          </div>
          <div className="text-gray-600">
            {/* Rest of the content */}
            <p className="text-gray-600 mb-4">
              ArtVoyage is an Interactive Museum Guide and Digital Art Gallery platform that allows museum visitors to explore exhibits and artworks while providing a space for artists to showcase and sell their digital creations.
            </p>
            <p className="text-gray-600 mb-4">
              We are dedicated to showcasing and promoting digital artworks from around the world. Our journey began in 2023 with a vision to provide a platform for both established and emerging digital artists to exhibit and sell their creations.
            </p>
            <p className="text-gray-600 mb-4">
              We believe in the power of digital art to inspire, provoke thought, and challenge conventions. Our services encompass a wide range of artistic styles and forms, from intricate digital paintings to mesmerizing generative art.
            </p>
            <p className="text-gray-600 mb-4">
              At ArtVoyage, our mission is to bridge the gap between artists and art enthusiasts, fostering a vibrant community where creativity knows no boundaries. We invite you to embark on a visual journey through the digital realm, exploring the diverse landscapes of imagination and innovation.
            </p>
            <p className="text-gray-600">
              Join us in celebrating the boundless possibilities of digital art!. <a href="/register"> Sign Up as User</a> and enjoy our wide range of artworks, exhibits and everything about art. <a href="/register"> Sign Up as an Artist </a> and let the world see the captivating artworks of yours that they are missing.
            </p>
          </div>
        </div>
      </div>
{/* grid grid-cols-1 md:grid-cols-2 gap-8*/}
<h2 className="text-2xl font-semibold mt-8 mb-2 text-red-500 text-center">Meet the Team</h2> 
      <div className="p-20 rounded-20 text-black">
        <div className="flex "> 
          <div>
            <h3 className="text-xl font-semibold mb-4 mr-12">Founder: Emmanuel Appiah</h3>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4 ml-96 text-red-500  text-center">Our Staff</h3>
          </div>
        </div>
        <div className="flex ">
          {/* Founder */}  
          <div className="mr-7">
            <img
              src={founder}
              alt="Founder"
              className="rounded-lg shadow"
            />
            <div className="ml-6 text-gray-600 m-11">
              <p>Emmanuel Appiah is the visionary founder of ArtVoyage. With a deep passion for art and a strong belief in the power of digital creativity, he laid the foundation for our platform. Emmanuel continues to inspire us with his dedication, leadership, and unwavering commitment to promoting digital art and artists.</p>
            </div>

          </div>

          <div className="grid grid-cols-2 gap-5">

            <div className="mb-6">             
              {/* Staff member 1 */}
              <img src={team1} alt="Staff Member 1" className="h-96 rounded-lg"/>
              <h4>Jane Doe</h4>
              <p>Role: Project Coordinator</p>
              <p>Jane Doe plays a crucial role in overseeing and managing our artworks and exhibits. With her expertise in community development and her heart for service, she ensures the smooth implementation of our initiatives, making a positive impact on the lives of those we serve.</p>
            </div>
            <div className="mb-6">
              {/* Staff member 2 */}
              <img src={ team2 } alt="Staff Member 2" className="h-96 rounded-lg"/>
              <h4>Michael Johnson</h4>
              <p>Role: Communications Specialist</p>
              <p>Michael Johnson is responsible for effectively communicating our mission, impact, and success stories. With his excellent communication skills and creative approach, he raises awareness about our work, engages with supporters, and encourages others to join our cause.</p>
            </div>
            <div>             
              {/* Staff member 3 */}
              <img src={team3} alt="Staff Member 3" className="h-96 rounded-lg"/>
              <h4>Jane Doe</h4>
              <p>Role: Project Coordinator</p>
              <p>Jane Doe plays a crucial role in overseeing and managing our artworks and exhibits. With her expertise in community development and her heart for service, she ensures the smooth implementation of our initiatives, making a positive impact on the lives of those we serve.</p>
            </div>
            <div>
              {/* Staff member 4 */}
              <img src={ team4 } alt="Staff Member 4" className="h-96 rounded-lg"/>
              <h4>Michael Johnson</h4>
              <p>Role: Communications Specialist</p>
              <p>Michael Johnson is responsible for effectively communicating our mission, impact, and success stories. With his excellent communication skills and creative approach, he raises awareness about our work, engages with supporters, and encourages others to join our cause.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
