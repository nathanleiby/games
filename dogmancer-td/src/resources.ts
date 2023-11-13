// Because snippets uses a bunder we load the image with an import
import { ImageSource, Loader } from "excalibur";
import levelOneBackground from "./assets/dogmancer-td.png";

// If you aren't using a bundler like parcel or webpack you can do this:
// const imagePlayer = new ex.ImageSource('./player.png')
export const Resources = {
  Images: {
    levelOneBackgroundImage: new ImageSource(levelOneBackground),
  },
  //... more resources
};

export const loader = new Loader([...Object.values(Resources.Images)]);
