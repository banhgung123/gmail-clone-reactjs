import React, { useEffect, useState } from "react";
import "./EmailList.css";
import { Checkbox, IconButton } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import RedoIcon from "@material-ui/icons/Redo";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import KeyboardHideIcon from "@material-ui/icons/KeyboardHide";
import SettingsIcon from "@material-ui/icons/Settings";
import InboxIcon from "@material-ui/icons/Inbox";
import PeopleIcon from "@material-ui/icons/People";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import Section from "./Section";
import EmailRow from "./EmailRow";
import { db, collection, onSnapshot, orderBy, query } from "./firebase";

function EmailList() {
  const [emails, setEmails] = useState(() => []);

  useEffect(() => {
    const q = query(collection(db, "emails"), orderBy("timestamp", "desc"));
    onSnapshot(q, (querySnapshot) => {
      const emails = [];
      querySnapshot.forEach((doc) => {
        emails.push({
          id: doc.id,
          data: doc.data()
        });
      });
      setEmails(emails);
    });
  }, []);
  return (
    <div className="emailList">
      <div className="emailList__settings">
        <div className="emailList__settingsLeft">
          <Checkbox />
          <IconButton>
            <ArrowDropDownIcon />
          </IconButton>
          <IconButton>
            <RedoIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
        <div className="emailList__settingsRight">
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
          <IconButton>
            <KeyboardHideIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </div>
      </div>
      <div className="emailList__sections">
        <Section Icon={InboxIcon} title="primary" color="red" selected />
        <Section Icon={PeopleIcon} title="Social" color="#1A73E8" />
        <Section Icon={LocalOfferIcon} title="Promotions" color="green" />
      </div>
      <div className="emailList__list">
        {emails.map(({ id, data: { to, subject, message, timestamp } }) => (
          <EmailRow
            key={id}
            id={id}
            title={to}
            subject={subject}
            description={message}
            timte={new Date(timestamp?.seconds * 1000).toUTCString()}
          />
        ))}
        {/* <EmailRow
          title="Twitch"
          subject="Hey fellows !!!"
          description="This is a test"
          time="10pm"
        />
        <EmailRow
          title="Twitch"
          subject="Hey fellows !!!"
          description="This is a test"
          time="10pm"
        /> */}
      </div>
    </div>
  );
}

export default EmailList;
