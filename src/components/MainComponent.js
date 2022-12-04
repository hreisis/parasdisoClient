import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import TeaInfo from './TeaInfoComponent';
import Favorites from './FavoriteComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { postComment, postFeedback, fetchTeas, fetchComments, fetchPromotions, fetchPartners,
    loginUser, logoutUser, fetchFavorites, postFavorite, deleteFavorite } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
        teas: state.teas,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions, 
        favorites: state.favorites,
        auth: state.auth
    };
};

const mapDispatchToProps = {
    postComment: (teaId, rating, text) => (postComment(teaId, rating, text)),
    postFeedback: feedback => (postFeedback(feedback)),
    fetchTeas: () => (fetchTeas()),
    resetFeedbackForm: () => (actions.reset('feedbackForm')),
    fetchComments: () => (fetchComments()),
    fetchPromotions: () => (fetchPromotions()),
    fetchPartners: () => (fetchPartners()),
    loginUser: creds => (loginUser(creds)),
    logoutUser: () => (logoutUser()),
    fetchFavorites: () => (fetchFavorites()),
    postFavorite: (teaId) => (postFavorite(teaId)),
    deleteFavorite: (teaId) => (deleteFavorite(teaId))
};

class Main extends Component {

    componentDidMount() {
        this.props.fetchTeas();
        this.props.fetchComments();
        this.props.fetchPromotions();
        this.props.fetchPartners();
        this.props.fetchFavorites();
    }



    render() {

        const HomePage = () => {
            
            return (
                <Home
                    tea={this.props.teas.teas.filter(tea => tea.featured)[0]}
                    teasLoading={this.props.teas.isLoading}
                    teasErrMess={this.props.teas.errMess}
                    promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                    promotionLoading={this.props.promotions.isLoading}
                    promotionErrMess={this.props.promotions.errMess}
                    partner={this.props.partners.partners.filter(partner => partner.featured)[0]}
                    partnerLoading={this.props.partners.isLoading}
                    partnerErrMess={this.props.partners.errMess}
                />
            );
        }

        const TeaWithId = ({match}) => {
            return (
                this.props.auth.isAuthenticated
                ?
                <TeaInfo
                    tea={this.props.teas.teas.filter(tea => tea._id === match.params.teaId)[0]}
                    isLoading={this.props.teas.isLoading}
                    errMess={this.props.teas.errMess}
                    comments={this.props.comments.comments.filter(comment => comment.tea === match.params.teaId)}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                    favorite={this.props.favorites.favorites && this.props.favorites.favorites.exists 
                                ? this.props.favorites.favorites.teas.some(tea => tea._id === match.params.teaId) : false}
                    postFavorite={this.props.postFavorite}
                />
                :
                <TeaInfo
                    tea={this.props.teas.teas.filter(tea => tea._id === match.params.teaId)[0]}
                    isLoading={this.props.teas.isLoading}
                    errMess={this.props.teas.errMess}
                    comments={this.props.comments.comments.filter(comment => comment.tea === match.params.teaId)}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                    favorite={false}
                    postFavorite={this.props.postFavorite}
                />
            );
        };

        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={props => (
                this.props.auth.isAuthenticated
                    ? <Component {...props} />
                    : <Redirect to={{
                              pathname: '/home',
                              state: { from: props.location }
                          }} 
                      />
                )} 
            />
        );

        return (
            <div>
                <Header auth={this.props.auth} 
                    loginUser={this.props.loginUser} 
                    logoutUser={this.props.logoutUser} 
                />   
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route path='/home' component={HomePage} />
                            <Route exact path='/directory' render={() => <Directory teas={this.props.teas} />} />
                            <Route path='/directory/:teaId' component={TeaWithId} />
                            <PrivateRoute exact path='/favorites' component={() => <Favorites favorites={this.props.favorites} deleteFavorite={this.props.deleteFavorite} />} />
                            <Route exact path='/aboutus' render={() => <About partners={this.props.partners} /> } />
                            <Redirect to='/home' />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));