import React from "react";
import "./SendMail.css";
import CloseIcon from "@material-ui/icons/Close";
import { Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { closeSendMessage } from "./features/mailSlice";
import { db, collection, addDoc, serverTimestamp } from "./firebase";

function SendMail() {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (formData) => {
    console.log(formData);
    await addDoc(collection(db, "emails"), {
      to: formData.to,
      subject: formData.subject,
      message: formData.message,
      timestamp: serverTimestamp()
    });

    dispatch(closeSendMessage());
  };

  return (
    <div className="sendMail">
      <div className="sendMail__header">
        <h3>New message</h3>
        <CloseIcon
          className="sendMail__close"
          onClick={() => dispatch(closeSendMessage())}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="to"
          placeholder="To"
          type="email"
          ref={register({ required: true })}
        />
        {errors.to && <p className="sendMail__error">To is Required!</p>}
        <input
          name="subject"
          placeholder="Subject"
          type="text"
          ref={register({ required: true })}
        />
        {errors.to && <p className="sendMail__error">Subject is Required!</p>}
        <input
          name="message"
          placeholder="Message..."
          type="text"
          className="sendMail__message"
          ref={register({ required: true })}
        />
        {errors.to && <p className="sendMail__error">Message is Required!</p>}
        <div className="sendMail__options">
          <Button
            className="sendMail__send"
            variant="contained"
            color="primary"
            type="submit"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SendMail;
