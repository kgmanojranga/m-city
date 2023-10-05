import { useState } from "react";
import { easePolyOut } from "d3-ease";
import { Animate } from "react-move";

const Test = () => {
  const [show, setShow] = useState<boolean>(true);
  const [bck, setBck] = useState<string>("#ffffff");
  return (
    <>
      <button
        onClick={() => {
          setBck("#f23455");
        }}
      >
        Update
      </button>
      <button
        onClick={() => {
          setShow(false);
        }}
      >
        Remove
      </button>
      <button
        onClick={() => {
          setShow(true);
        }}
      >
        Show
      </button>
      <Animate
        show={show}
        start={{
          backgroundColor: bck,
          width: 500,
          height: 500,
          opacity: 1
        }}
        enter={{
          backgroundColor: bck,
          width: [100],
          height: [100],
          opacity: [1],
          timing: {
            duration: 1000,
            ease: easePolyOut
          }
        }}
        update={{
          backgroundColor: bck,
          width: [100],
          height: [100],
          opacity: [0.5],
          timing: {
            duration: 2000,
            ease: easePolyOut
          },
          event: {
            start: () => {
              console.log("STARTED");
            },
            end: () => {
              console.log("ENDED");
            },
            interrupt: () => {}
          }
        }}
        leave={[
          {
            width: [1000],
            timing: {
              duration: 500,
              ease: easePolyOut
            }
          },
          {
            opacity: [0],
            timing: {
              delay: 2000,
              duration: 3000,
              ease: easePolyOut
            }
          }
        ]}
      >
        {({ width, height, opacity, backgroundColor }) => (
          <div style={{ backgroundColor, width, height, opacity }}> hello </div>
        )}
      </Animate>
    </>
  );
};

export default Test;
