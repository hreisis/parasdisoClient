import React from 'react';
import { Media, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

function RenderFavoriteItem({ tea, deleteFavorite }) {
    return (
        <Media tag='li'>
            <Media left middle>
                <Media object src={baseUrl + tea.image} alt={tea.name} />
            </Media>
            <Media body className='ml-5'>
                <Media heading>{tea.name}</Media>
                <p>{tea.description}</p>
                <Button outline color='danger' onClick={() => deleteFavorite(tea._id)}>
                    <i className='fa fa-times' />
                </Button>
            </Media>
        </Media>
    );
}

const Favorites = props => {

    if (props.favorites.isLoading) {
        return (
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.favorites.errMess) {
        return (
            <div className='container'>
                <div className='row'>
                    <h4>{props.favorites.errMess}</h4>
                </div>
            </div>
        )
    }
    if (props.favorites.favorites.teas) {
        const favorites = props.favorites.favorites.teas.map(tea => 
            <div key={tea._id} className='col-12 mt-5'>
                <RenderFavoriteItem tea={tea} deleteFavorite={props.deleteFavorite} />
            </div>
        );

        return (
            <div className='container'>
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>My Favorites</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>My Favorites</h3>
                        <hr />
                    </div>
                </div>
                <div className='row'>
                    <Media list>
                        {favorites}
                    </Media>
                </div>
            </div>
        );
    } else {
        return (
            <div className='container'>
                <div className='row'>
                    <h4>You have no favorites selected.</h4>
                </div>
            </div>
        )
    }
}

export default Favorites;