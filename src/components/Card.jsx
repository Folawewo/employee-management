import IMG from "../assets/img/p2.jpeg";
import IMG2 from "../assets/img/p4.jpeg";
import IMG3 from "../assets/img/p7.jpeg";
import IMG4 from "../assets/img/p6.jpeg";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import Calender from "../assets/img/calender.svg";
import IMG5 from "../assets/img/p7.jpeg";

const Card = ({ percentage1, percentage2, className }) => {
  const overall = percentage1 + percentage2 / 200;
  return (
    <>
      <div className={`${className} m-4 flex h-48 gap-2 rounded-xl shadow-lg `}>
        <div className=" flex items-center justify-center">
          <div className="">
            <div className="left m-2 p-2">
              <p className="text-lg font-semibold">Intercom</p>
              <p className="text-sm font-normal">Digital Product Design</p>
            </div>
            <div className="ml-5 flex items-center justify-between gap-20">
              <div className=" relative flex flex-col content-start items-start text-sm font-normal">
                <p className="">Team</p>
                <div className="absolute  top-4 py-2">
                  <div>
                    <AvatarGroup size="sm" max={3}>
                      <Avatar name="Ryan Florence" src={IMG} />
                      <Avatar name="Segun Adebayo" src={IMG2} />
                      <Avatar name="Kent Dodds" src={IMG3} />
                      <Avatar name="Prosper Otemuyiwa" src={IMG4} />
                      <Avatar name="Christian Nwamba" src={IMG5} />
                    </AvatarGroup>
                  </div>
                </div>
              </div>
              <div>
                <div className="mt-8 flex flex-col items-center gap-2">
                  <p className=" mb-1 text-xs opacity-60">Due Date</p>
                  <div className="flex gap-2 whitespace-nowrap font-medium">
                    <img src={Calender} />
                    <p className="text-xs font-medium opacity-90">
                      June 6, 2022
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mr-10 mt-6 ">
          <div className="w-24">
            <div className="ml-4">
              <CircularProgressbarWithChildren
                value={percentage1}
                styles={buildStyles({
                  pathColor: "#F77307",
                  trailColor: "#eee",
                  strokeLinecap: "butt",
                })}
              >
                {/* Foreground path */}
                <CircularProgressbar
                  value={percentage2}
                  text={`${overall}%`}
                  styles={buildStyles({
                    trailColor: "transparent",
                    strokeLinecap: "butt",
                  })}
                />
              </CircularProgressbarWithChildren>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
