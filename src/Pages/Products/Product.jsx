import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../../global.css";

import { fadeIn, staggerContainer } from "../../Components/Motion/Motion";
import {BasicCard} from "../../Components";
import { MyContext } from "../../App";

const token = localStorage.getItem("token")

const { REACT_APP_BECKEND } = process.env

function Products() {
  const { edited, setEdited, } = useContext(MyContext)
  const [data, setData] = useState([]);

  useEffect(() => {
    if(token){
      fetch(REACT_APP_BECKEND + "/products", {
        headers: {
          token: token
        },
        method: "GET"
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
    } else {
      fetch(REACT_APP_BECKEND + "/products", {
        method: "GET"
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
  }, [edited, setEdited]);


  

  return (
    <>
      <div className="products">
        {
          data.length > 0 ? 
          (
            data.map((item) => (
              <motion.div
                animate={{
                  x: 0,
                  y: 20,
                  scale: 1,
                  rotate: 0,
                }}
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.25 }}
                key={item.id}
                className="cardsWrapper"
              >
                <motion.div
                  variants={fadeIn("up", "tween", 0.2, 0.4)}
                  className="cards"
                >
                  { BasicCard(item) }
                </motion.div>
              </motion.div>
          ))
        ) : (
          data ? (
            data.map((item) => (
              <motion.div
                animate={{
                  x: 0,
                  y: 20,
                  scale: 1,
                  rotate: 0,
                }}
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.25 }}
                key={item.id}
                className="cardsWrapper"
              >
                <motion.div
                  variants={fadeIn("up", "tween", 0.2, 0.4)}
                  className="cards"
                >
                  { BasicCard(item) }
                </motion.div>
              </motion.div>
          ))
          ) : <div>Failed to load data</div>
        )}
      </div>
    </>
  );
}

export default Products;
