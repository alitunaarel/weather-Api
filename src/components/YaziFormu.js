import React, { useState, useEffect } from "react";
import { api } from "../api";
import { withRouter } from "react-router-dom";

const YaziFormu = props => {
  const [yazi, setYazi] = useState({
    title: "",
    content: ""
  });
  const [hata, setHata] = useState("");

  const onInputChange = event =>
    setYazi({ ...yazi, [event.target.name]: event.target.value });

  const onFromSubmit = event => {
    event.preventDefault();
    setHata("");

    if (props.yazi.title) {
      api()
        .put(`/posts/${props.match.params.id}`, yazi)
        .then(response => {
          console.log(response);
          props.history.push(`/posts/${props.match.params.id}`);
        })
        .catch(error =>{
          setHata("baslik icerigi zorunlu");
        })
    } else {
      api()
        .post("/posts", yazi)
        .then(response => {
          props.history.push("/");
        })
        .catch(error => {
          setHata("baslik ve yazi icerigi alanalri zorunludur..");
        });
    }
  };

  useEffect(() => {
    if (props.yazi.title && props.yazi.content) setYazi(props.yazi);
  }, [props.yazi]);

  return (
    <React.Fragment>
      {hata && (
        <div className="ui error message">
          <div className="header">Hata </div>
          <p>{hata}</p>
        </div>
      )}

      <div className="ui form">
        <div className="field">
          <label>Yazi Basligi</label>
          <input
            onChange={onInputChange}
            value={yazi.title}
            type="text"
            name="title"
          />
        </div>
        <div className="field">
          <label>Yazi icerigi </label>
          <textarea
            onChange={onInputChange}
            value={yazi.content}
            rows="2"
            name="content"
          ></textarea>
        </div>
        <button className="ui primary button" onClick={onFromSubmit}>
          Gonder
        </button>
        <button className="ui button">Iptal Et</button>
      </div>
    </React.Fragment>
  );
};

export default withRouter(YaziFormu);