import { useContext, useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import "../../global.css";

import { DefaultCard } from "../../Components";
import { MyContext } from "../../App";

const { REACT_APP_BECKEND } = process.env;

function AllProducts() {
  const styles = useSpring({
    from: {
      opacity: 0,
      y: 100,
    },
    to: {
      opacity: 1,
      y: 1,
    },
  });

  const { edited, setEdited } = useContext(MyContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(REACT_APP_BECKEND + "/all_products", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
        setEdited(false);
      })
      .catch((err) => {
        setData({ data: [] });
        setEdited(false);
      });
  }, [edited, setEdited]);

  return (
    <>
      <div className="products">
        {data ? (
          data.map((item) => (
            <animated.div style={styles} className="cards">
              {DefaultCard(item)}
            </animated.div>
          ))
        ) : (
          <div>Failed to load data</div>
        )}
      </div>
    </>
  );
}

export default AllProducts;
