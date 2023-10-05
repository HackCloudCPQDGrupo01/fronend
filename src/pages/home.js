import Image from 'react-bootstrap/Image'
import '../css/home.css';
import Menu from './menu.js';
import * as constants from './constants';

export default function Home() {
  return (
      <div className="center">
          <Menu/>
            <div>
           
            <Image className="image-details" src="https://objectstorage.sa-saopaulo-1.oraclecloud.com/p/31IdzhZcCLEo3ydugFKdlSllHz0icpJA2WYaSS4K1RrblJpQv63k9LC2W_AJPh7J/n/gro465m12zbx/b/bucket-20231005-0813/o/testelogo.png" rounded />
            </div>
              
      </div>
  );
}
