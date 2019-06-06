import React from "react";
import "./App.css";

function ImageSearchPresentation(props) {
  if (!props.images) return "where are the images????";
  return (
    <>
      <h1>Cute Reddit Images -{props.loading && "loading"}</h1>
      <input value={props.query} onChange={props.setQuery} />
      <hr />
      {props.images.map(src => (
        <img src={src} />
      ))}
    </>
  );
}

class ImageSearch extends React.Component {
  state = {
    images: [],
    loading: false,
    query: "cats"
  };

  componentDidMount() {
    this.fetchImages();
  }

  fetchImages() {
    this.setState({ loading: true });

    fetch(`https://www.reddit.com/r/aww/search.json?q=${this.state.query}`)
      .then(response => response.json())
      .then(json => {
        this.setState({
          loading: false,
          images: json.data.children.map(child => 
            child.data.thumbnail
          )
        });
      });
  }

  setQuery = event => {
    this.setState({ query: event.target.value }, this.fetchImages);
  };

  render() {
    return this.props.render({
      images: this.state.images,
      loading: this.state.loading,
      query: this.state.query,
      setQuery: this.setQuery
    });
  }
}

function App() {
  return (
    <div className="App">
      <ImageSearch
        render={values => (
          <ImageSearchPresentation
            images={values.images}
            loading={values.loading}
            query={values.query}
            setQuery={values.setQuery}
          />
        )}
      />
    </div>
  );
}

export default App;
