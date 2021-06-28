import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import FeaturedList from '../components/articles/ArticleFeatured';
import Search from "../components/Search";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Footer from '../components/Footer';



function HomePage() {
    return (
        <>
        <div>
            <Jumbotron fluid>
                <Container>
                    <h1>Your #1 source of coding news!</h1>
                    <p className="jumboText">
                       Make yourself some coffee and start programming.
                    </p>
                </Container>
            </Jumbotron>
            
                <div className="headerSearch">
                 <Search />
                 <p className="searchText">or</p>
                 <Link to="/articles">
  					<Button className="HomeBtn" size="lg">
  						 Browse all
 					</Button>
				</Link>
                </div>
                <h2>Newest articles</h2>
            <FeaturedList />
            <Footer />
        </div>
        
        </>
    )
}

export default HomePage;