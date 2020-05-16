import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

const YaziFormu = props => {
  const [yazi, setYazi] = useState({ title: "", content: "" });
  const [hata, setHata] = useState("");

  const onInputChange = event =>
    setYazi({ ...yazi, [event.target.name]: event.target.value });

  const onFromSubmit = event => {
    event.preventDefault();
    setHata("");
    axios
      .post("https://react-yazi-yorum.herokuapp.com/posts", yazi)
      .then(response => {
        props.history.push("/");
      })
      .catch(error => {
        setHata("baslik ve yazi icerigi alanalri zorunludur..");
      });
  };

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

// Degerli Hocam, video herzaman ki gibi harika olmus emeginize saglik,
// Sesli dusundugunuz kisimalri birakmaniz cok yararli oluyor kanaatimce,
//  tesekkur ederim. Musadenizle bir soru sormak istiyorum,React redux kullanip bir state
//  manegement
