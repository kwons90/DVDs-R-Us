/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getMovies } from '../redux/movies/actions';
import { generateGenres, movieFilter } from '../utilities';
import SingleMovieBox from './singleMovieBox';

class Browse extends Component {
  constructor() {
    super();
    this.state = {
      filter: 'All',
      sort: 'A-Z',
      genres: [],
      sortMethods: ['A-Z', 'Z-A', 'Highest Rated', 'Lowest Rated', 'Released (Most Recent)', 'Released (Oldest)'],
    };
    this.handleFilter = this.handleFilter.bind(this);
  }

  async componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { getMovies } = this.props;
    await getMovies();
    const { movies } = this.props;
    this.setState({
      genres: generateGenres(movies),
    });
  }

  handleFilter(e) {
    e.preventDefault();
    const val = e.target.value;
    this.setState({
      filter: val,
      genres: generateGenres(this.props.movies),
    });
  }

  render() {
    const {
      movies,
      props: {
        history,
      },
    } = this.props;

    let moviesToDisplay = movies;
    // const { handleFilter } = this;
    const {
      filter, sort, genres, sortMethods,
    } = this.state;
    moviesToDisplay = movieFilter(moviesToDisplay, filter, sort);
    return (
      <div style={{ marginTop: '3.75rem' }}>
        {
          (moviesToDisplay.length)
            ? (
              <div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <select style={{ margin: '10px' }} className="select brandButton" onChange={(e) => this.setState({ filter: e.target.value })}>
                    <option value="All">All</option>
                    {
                      genres.map((genre) => <option key={genre} value={genre}>{ genre }</option>)
                    }
                  </select>
                  {/* <div style={{
                    display: 'flex', width: '100%', overflowX: 'scroll', padding: '15px', backgroundColor: '#1030AD', border: '3px solid #ffcc00', borderRadius: '5px',
                  }}
                  >
                    <button value="All" style={{ margin: '0px 5px' }} onClick={handleFilter} type="button" key="All" className={this.state.filter === 'All' ? 'brandSelected button' : 'brandButton button'}>All</button>
                    {
                      genres.map((genre) => (
                        <button value={genre} style={{ margin: '0px 5px' }} onClick={handleFilter} type="button" key={genre} className={this.state.filter === genre ? 'brandSelected button' : 'brandButton button'}>{ genre }</button>
                      ))
                    }
                  </div> */}
                  <select style={{ margin: '10px' }} className="select brandButton" onChange={(e) => this.setState({ sort: e.target.value })}>
                    {
                      sortMethods.map((method) => (
                        <option key={method} value={method}>{ method }</option>
                      ))
                    }
                  </select>
                </div>
                <ul>
                  {
                    moviesToDisplay.map((movie) => (
                      <SingleMovieBox key={movie.id} movie={movie} history={history} />
                    ))
                  }
                </ul>
              </div>
            )
            : null
          }
      </div>
    );
  }
}

Browse.propTypes = {
  getMovies: propTypes.func.isRequired,
  movies: propTypes.arrayOf(propTypes.object).isRequired,
  // props: propTypes.object.isRequired,
  props: propTypes.shape({
    match: propTypes.shape({
      path: propTypes.string.isRequired,
    }).isRequired,
    history: propTypes.isRequired,
  }).isRequired,
};

const mapStatetoProps = (state) => ({
  movies: state.movieReducer.movies,
});

const mapDispatchToProps = { getMovies };

export default connect(mapStatetoProps, mapDispatchToProps)(Browse);

/* eslint-disable react/forbid-prop-types */
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import propTypes from 'prop-types';
// import { getMovies } from '../redux/movies/actions';
// import { generateGenres, movieFilter } from '../utilities';
// import SingleMovieBox from './singleMovieBox';

// class Browse extends Component {
//   constructor() {
//     super();
//     this.state = {
//       filter: 'All',
//       sort: 'A-Z',
//       genres: [],
//       sortMethods: ['A-Z', 'Z-A', 'Highest Rated', 'Lowest Rated', 'Released (Most Recent)', 'Released (Oldest)'],
//     };
//   }

//   async componentDidMount() {
//     // eslint-disable-next-line no-shadow
//     const { getMovies } = this.props;
//     await getMovies();
//     const { movies } = this.props;
//     this.setState({
//       genres: generateGenres(movies),
//     });
//   }

//   render() {
//     const {
//       movies,
//       props: {
//         history,
//       },
//     } = this.props;

//     let moviesToDisplay = movies;

//     const {
//       filter, sort, genres, sortMethods,
//     } = this.state;
//     moviesToDisplay = movieFilter(moviesToDisplay, filter, sort);
//     return (
//       <div style={{ marginTop: '3.25rem' }}>
//         {
//           (moviesToDisplay.length)
//             ? (
//               <div>
//                 <div>
//                   <select style={{ margin: '10px' }} className="select brandButton" onChange={(e) => this.setState({ sort: e.target.value })}>
//                     {
//                       sortMethods.map((method) => (
//                         <option key={method} value={method}>{ method }</option>
//                       ))
//                     }
//                   </select>
//                   <select style={{ margin: '10px' }} className="select brandButton" onChange={(e) => this.setState({ filter: e.target.value })}>
//                     <option value="All">All</option>
//                     {
//                       genres.map((genre) => <option key={genre} value={genre}>{ genre }</option>)
//                     }
//                   </select>
//                 </div>
//                 <ul>
//                   {
//                     moviesToDisplay.map((movie) => (
//                       <SingleMovieBox key={movie.id} movie={movie} history={history} />
//                     ))
//                   }
//                 </ul>
//               </div>
//             )
//             : null
//           }
//       </div>
//     );
//   }
// }

// Browse.propTypes = {
//   getMovies: propTypes.func.isRequired,
//   movies: propTypes.arrayOf(propTypes.object).isRequired,
//   // props: propTypes.object.isRequired,
//   props: propTypes.shape({
//     match: propTypes.shape({
//       path: propTypes.string.isRequired,
//     }).isRequired,
//     history: propTypes.isRequired,
//   }).isRequired,
// };

// const mapStatetoProps = (state) => ({
//   movies: state.movieReducer.movies,
// });

// const mapDispatchToProps = { getMovies };

// export default connect(mapStatetoProps, mapDispatchToProps)(Browse);
