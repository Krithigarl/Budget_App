import React, { useState } from "react";
import { Container, Row, Col, Button, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import budget from '../assets/budget.jpg'
import Navigation from "../component/Navigation";
function HeroSection() {
  const testimonials = [
  {
    id: 1,
    name: "Ramesh Kumar",
    role: "Entrepreneur",
    image:
      "https://i.pravatar.cc/100?img=1",
    text: "This Budget Management System has completely transformed the way I manage my finances. The dashboard is simple, the reports are accurate, and tracking my expenses has never been easier."
  },

  {
    id: 2,
    name: "Ramalingam",
    role: "Building Contractor",
    image:
      "https://i.pravatar.cc/100?img=2",
    text: "I love how easy it is to record income and expenses in one place. The budgeting features help me stay financially organized and make better spending decisions every month."
  },

  {
    id: 3,
    name: "Suresh Kumar",
    role: "Freelancer",
    image:
      "https://i.pravatar.cc/100?img=3",
    text: "The system is user-friendly, fast, and reliable. The visual reports give me a clear understanding of my financial performance, making budget planning much more effective"
  }
];
  const features = [
    {
      icon: "💰",
      title: "Budget Planning",
      text: "Create monthly and yearly budgets easily.",
    },
    {
      icon: "📊",
      title: "Expense Tracking",
      text: "Monitor all expenses with real-time reports.",
    },
    {
      icon: "📈",
      title: "Financial Reports",
      text: "Generate detailed charts and reports.",
    },
    {
      icon: "🏦",
      title: "Income Management",
      text: "Manage multiple income sources efficiently.",
    },
    
  ];
  const [current, setCurrent] = useState(1);

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };
  return (
    <>
    <Navigation/>
      <section id="home" className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} md={12}>
              <span className="tag">Budget Management System</span>

              <h1 className="hero-title">
                Manage Your <br />
                Budget Smartly
              </h1>

              <p className="hero-text">
                Track your income, monitor expenses, create budgets, and
                generate financial reports with an easy-to-use budget
                management platform.
              </p>

              <Button as={Link} to="/register" className="hero-btn">Get Started →</Button>
            </Col>

            <Col lg={6} md={12} className="text-center mt-5 mt-lg-0">
              <img
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=700"
                alt="Budget Management"
                className="hero-image"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* <Container > */}
        <Row className="cards-section">
          {features.map((item, index) => (
            <Col lg={2} md={4} sm={6} xs={12} key={index} className="column-card">
              <Card className="feature-card">
                <Card.Body>
                  <div className="icon">{item.icon}</div>
                  <h5>{item.title}</h5>
                  <p>{item.text}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      {/* </Container> */}
      <section id="about">
       <Container className="py-5">
      <h1 className="text-center fw-bold mb-5">ABOUT US</h1>

      <Row className="align-items-center g-5">
        {/* Image */}
        <Col lg={5} md={6} className="text-center">
          <Image
            src={budget}
            alt="Budget Management"
            fluid
            rounded
          />
        </Col>

        {/* Content */}
        <Col lg={7} md={6}>
          <h2 className="fw-bold fs-4 mb-3">Budget Management</h2>

          <p className="text-muted text-one">
            Budget Management is a smart and user-friendly financial
            management platform designed to help individuals and organizations
            track their income, expenses, and budgets efficiently.
          </p>

          <p className="text-muted text-one">
            Our platform simplifies financial planning by providing real-time
            insights into spending patterns, helping users make informed
            financial decisions. With an intuitive interface, users can easily
            monitor transactions, manage budgets, and achieve their financial
            goals.
          </p>
        </Col>
      </Row>
    </Container>
    </section>
    <Row className="text-center bgcolor pt-4 pb-4">
      <Col lg={12} className="text-center py-5 text-white">
        <h2 className="fw-bold mb-4">Get Started Today!</h2>
        <p className="text-white fs-5 mb-4">
          Join thousands of users who have transformed their financial management with our platform.
        </p>
        <Button as={Link} to="/register" className="hero-btn">Get Started</Button>
      </Col>
    </Row>
    <section id="testimonials" className="testimonial-section py-5">
      <Container className="testimonial-container">

        <p className="fw-semibold mb-1">
          What our customers say about us
        </p>

        <h2 className="display-5 fw-bold mb-5">
          Testimonials
        </h2>

        <div className="testimonial-slider">

          <Button
            variant="light"
            className="arrow left"
            onClick={prevSlide}
          >
            ❮
          </Button>

          {testimonials.map((item, index) => {

            let position = "nextSlide";

            if (index === current) {
              position = "activeSlide";
            }

            if (
              index === current - 1 ||
              (current === 0 && index === testimonials.length - 1)
            ) {
              position = "lastSlide";
            }

            return (
              <Card
                key={item.id}
                className={`testimonial-card ${position} shadow border-0`}
              >
                <Card.Body>

                  <div className="d-flex align-items-center justify-content-center mb-3">

                    <Image
                      src={item.image}
                      roundedCircle
                      width={60}
                      height={60}
                    />

                    <div className="ms-3 text-start">
                      <h5 className="mb-0">{item.name}</h5>
                      <small>
                        {item.role}
                      </small>
                    </div>

                  </div>

                  <Card.Text className="text-one">
                    {item.text}
                  </Card.Text>

                </Card.Body>
              </Card>
            );
          })}

          <Button
            variant="light"
            className="arrow right"
            onClick={nextSlide}
          >
            ❯
          </Button>

        </div>

        <div className="dots mt-5 text-center">

          {testimonials.map((_, index) => (
            <span
              key={index}
              className={`dot ${
                current === index ? "active-dot" : ""
              }`}
            />
          ))}

        </div>

      </Container>
    </section>
    <section id="contact" className="bg-dark text-white py-5">
      <Container>
        <Row className="align-items-center g-5">
          <Col lg={4} md={12}>
            <h2 className="fw-bold mb-3">Contact Us</h2>
            <p className="text-one">
              Have questions or feedback? We'd love to hear from you. Reach out to our team and let us know how we can help you on your financial journey.
            </p>
            <Button as={Link} to="/register" className="hero-btn">Get in Touch</Button>
          </Col>
          <Col lg={4} md={12} className="text-center mt-5 mt-lg-0">
            <p>Email: info@budgetmanager.com</p>
            <p>Phone: (123) 456-7890</p>
            <p>Address: 123 Financial Street, Moneyville</p>
          </Col>
          <Col lg={4} className="text-center mt-5">
            <h2 className="fw-bold mb-3">Follow Us</h2>
            <p className="text-white text-one">
              Stay updated with the latest news and updates by following us on social media.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
    <section className="bg-dark text-white py-3">
      <Container>
        <footer className="text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} Budget Management System. All rights reserved.</p>
        </footer>
      </Container>
    </section> 

    
    </>
  );
}

export default HeroSection;
