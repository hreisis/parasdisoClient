import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderDirectoryItem({tea}) {
    return (
        <Card>
            <Link to={`/directory/${tea._id}`}>
                <CardImg width='100%' src={baseUrl + tea.image} alt={tea.name} />
                <CardImgOverlay>
                    <CardTitle>{tea.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

function Directory(props) {

    const directory = props.teas.teas.map(tea => {
        return (
            <div key={tea._id} className='col-md-5 m-1'>
                <RenderDirectoryItem tea={tea} />
            </div>
        );
    });

    if (props.teas.isLoading) {
        return (
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.teas.errMess) {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h4>{props.teas.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Directory</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>Directory</h2>
                    <hr />
                </div>
            </div>
            <div className='row'>
                {directory}
            </div>
        </div>
    );
}

export default Directory;