import { Vortex } from 'react-loader-spinner';


const Loader = () => {
    return (
      <div className='h-[80vh] flex items-center justify-center'>
        <div className="flex justify-center">
          <Vortex
            visible={true}
            height="100"
            width="100"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={[
              "red",
              "green",
              "blue",
              "yellow",
              "orange",
              "purple",
            ]}
          />
        </div>
      
      </div>
  
       
    );
};

export default Loader;