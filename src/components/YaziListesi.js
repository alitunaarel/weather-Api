import React, { useEffect, useState } from "react";
import {api} from "../api"
import { Link } from "react-router-dom";
import moment from 'moment'

const YaziListesi = props => {
  const [yaziListesi, setYaziListesi] = useState([]);

  useEffect(() => {
    api()
    .get("/posts")
    .then(response => {
      setYaziListesi(response.data);
    });
  }, []);

  return (
    <div className="ui relaxed divided list">
      {yaziListesi.map(yazi => {
        return (
          <div className="item" key={yazi.id}>
            <i className="large github middle aligned icon"></i>
            <div className="content">
              <Link to={`posts/${yazi.id}`} className="header">
                {yazi.title}
              </Link>
              <div className="description">{moment(yazi.created_at).format('LLLL')}</div>
            </div>
          </div>
        );
      })}{" "}
    </div>
  );
};

export default YaziListesi;
