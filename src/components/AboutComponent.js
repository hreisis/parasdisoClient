import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import { Fade, Stagger } from 'react-animation-components';

function RenderPartner({partner}) {
    if (partner) {
        return (
            <React.Fragment>
                <Media object src={baseUrl + partner.image} alt={partner.name} width="150" />
                <Media body className="ml-5 mb-4">
                    <Media heading>{partner.name}</Media>
                    {partner.description}
                </Media>
            </React.Fragment>
        );
    }
    return <div />;
}

function PartnerList(props) {
    const partners = props.partners.partners.map(partner => {
        return (
            <Fade in key={partner._id}>
                <Media tag="li">
                    <RenderPartner partner={partner} />
                </Media>
            </Fade>
        );
    });

    if (props.partners.isLoading) {
        return <Loading />;
    }
    if (props.partners.errMess) {
        return (
            <div className="col">
                <h4>{props.partners.errMess}</h4>
            </div>
        );
    }
    return (
        <div className="col mt-4">
            <Media list>
                <Stagger in>
                    {partners}
                </Stagger>
            </Media>
        </div>
    );
}


function About(props) {

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>About Us</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>About Us</h2>
                    <hr />
                </div>
            </div>
            <div className="row row-content">
                <div className="col-sm-6">
                    <h3>Welcome to Paradiso</h3>
                    <p>We have put the early-Taiwan epitome, historic memories and warm hospitality in this one cup of drink -- using home-made organic cane sugar, seasonal fresh fruits, natural ingredients (zero concentrated juice and powders). In every sip, you can taste the freshness of the tea and sweetness of the fruits, recreating the authentic and classic flavor all over again.</p>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h3>Community Partners</h3>
                </div>
                <PartnerList partners={props.partners} />
            </div>
        </div>
    );
}

export default About;