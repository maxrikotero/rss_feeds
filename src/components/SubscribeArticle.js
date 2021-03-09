import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import "./SubscribeArticle.css";

const SubscribeArticle = ({ onSave }) => {
  const [url, setUrl] = useState("");

  const handleChange = ({ target: { value } }) => setUrl(value);

  const handleAdd = () => {
    if (Boolean(url)) onSave({ url });
  };
  return (
    <div className="subscribe__article">
      <TextField
        id="standard-basic"
        error={!Boolean(url)}
        label="Url"
        name="url"
        value={url}
        onChange={handleChange}
        style={{ width: "300px" }}
        helperText={!Boolean(url) ? "Url is required" : ""}
      />
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: 30 }}
        onClick={handleAdd}
      >
        Subscrite
      </Button>
    </div>
  );
};

export default SubscribeArticle;
