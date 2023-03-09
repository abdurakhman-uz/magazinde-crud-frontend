import { useContext, useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import "../../global.css";

import { BasicCard } from "../../Components";
import { MyContext } from "../../App";
import { AuthContext } from "../../Context/authContext";

// const token = localStorage.getItem("token");

const { REACT_APP_BECKEND } = process.env;

function Products() {
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
  const { token } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (token) {
      fetch(REACT_APP_BECKEND + "/products", {
        headers: {
          token: token,
        },
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
    }
  }, [edited]);

  return (
    <>
      <div className="products">
        {data ? (
          data.map((item) => (
            <animated.div style={styles} className="cards">
              {BasicCard(item)}
            </animated.div>
          ))
        ) : (
          <div>Failed to load data</div>
        )}
      </div>
    </>
  );
}

export default Products;
