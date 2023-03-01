import { ShareAltOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { Message } from "../";

const { REACT_APP_BECKEND } = process.env;
const { Meta } = Card;

const DefaultCard = (item) => {

  return (
    <>
      <Card
        style={{
          width: 300,
        }}
        cover={
          <img
            alt="productImage"
            src={REACT_APP_BECKEND + item.img}
            height="200"
          />
        }
        actions={[<ShareAltOutlined key="share" />]}
      >
        <Meta title={item.name} description={item.author} price={item.price} />
        <hr />
        {/* <br /> */}
        <Meta description={item.price} />
      </Card>
    </>
  );
};
export default DefaultCard;
