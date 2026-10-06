import React, { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Card, ListGroup, Form, Button, Alert, Spinner } from "react-bootstrap";
import { FaWallet, FaExchangeAlt, FaChartLine, FaPiggyBank, FaSignOutAlt, } from "react-icons/fa";
import axiosClient, { getAccessToken, getUser, logout } from "../utils/auth";
import Navigation from "../component/Navigation";
function Dashboard({ onLogout }) {
  const [profile, setProfile] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({ month: "", income: "", expense: "", description: "" });
  const currentUser = getUser();
  const fetchEntries = async () => {
    try {
      const token = getAccessToken();
      if (!token) {
        setError("No token found. Please log in again.");
        setLoading(false);
        return;
      }
      const [profileResponse, budgetResponse] = await Promise.all([
        axiosClient.get("/profile/"),
        axiosClient.get("/budget/"),
      ]);
      setProfile(profileResponse.data);
      setEntries(budgetResponse.data || []);
      setError("");
    } catch (err) {
      console.error("Budget fetch failed:", err);
      setError("Unable to load budget data from the server.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEntries();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    const income = Number(formData.income || 0);
    const expense = Number(formData.expense || 0);
    if (income <= 0 || expense <= 0 || !formData.month) {
      setError("Please enter a month, valid income, and expense.");
      setSaving(false);
      return;
    }
    try {
      const response = await axiosClient.post("/budget/", {
        month: formData.month,
        income,
        expense,
        description: formData.description || `${formData.month} budget entry`,
      });
      setEntries((prev) => [response.data, ...prev]);
      setFormData({ month: "", income: "", expense: "", description: "" });
      setMessage("Budget entry saved successfully to the database.");
    } catch (err) {
      console.error("Save budget failed:", err);
      setError("Unable to save the budget entry right now.");
    } finally {
      setSaving(false);
    }
  };
  const monthlySavings = useMemo(() => {
    return entries.slice(0, 6).map((entry) => ({
      month: entry.month,
      amount: Number(entry.savings || 0),
      wallet: Number(entry.wallet_balance || 0),
    }));
  }, [entries]);
  const handleLogout = () => {
    logout();
    if (onLogout) onLogout();
  };
  const latestEntry = entries[0] || null;
  const income = latestEntry ? Number(latestEntry.income) : 0;
  const expense = latestEntry ? Number(latestEntry.expense) : 0;
  const wallet = latestEntry ? Number(latestEntry.wallet_balance) : 0;
  const savings = latestEntry ? Number(latestEntry.savings) : 0;
  const spendingRatio = income > 0 ? Math.min(100, Math.round((expense / income) * 100)) : 0;
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  return (
    <>
      <Navigation loggedIn={true} user={profile} onlogout={handleLogout}></Navigation>
      <Container fluid className="bg-light p-4 min-vh-100">
        <Card className="shadow-sm mb-4">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div>
                <h3 className="mb-1">Welcome back, {profile?.username || currentUser?.username || "there"}!</h3>
                <p className="text-muted mb-0">Your income, expenses, wallet balance, and savings are stored in the database.</p>
              </div>
            </div>
          </Card.Body>
        </Card>

        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}

        <Card className="shadow-sm mb-4">
          <Card.Body>
            <h5 className="mb-3">Add a new month budget</h5>
            <Form onSubmit={handleSave}>
              <Row className="g-3">
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Month</Form.Label>
                    <Form.Control type="text" name="month" value={formData.month} onChange={handleChange} placeholder="e.g. July" required />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Total Income</Form.Label>
                    <Form.Control type="number" name="income" value={formData.income} onChange={handleChange} placeholder="e.g. 50000" required />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Total Expense</Form.Label>
                    <Form.Control type="number" name="expense" value={formData.expense} onChange={handleChange} placeholder="e.g. 20000" required />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Optional note" />
                  </Form.Group>
                </Col>
              </Row>
              <Button type="submit" className="mt-3" disabled={saving}>
                {saving ? "Saving..." : "Save Budget Entry"}
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <Row className="g-4">
          <Col lg={4}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <small className="text-muted">Latest Income</small>
                    <h4 className="mb-0">₹{income.toLocaleString()}</h4>
                  </div>
                  <FaChartLine size={24} className="text-primary" />
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <small className="text-muted">Latest Expense</small>
                    <h4 className="mb-0">₹{expense.toLocaleString()}</h4>
                  </div>
                  <FaExchangeAlt size={24} className="text-danger" />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small className="text-muted">Savings</small>
                    <h4 className="mb-0 text-success">₹{savings.toLocaleString()}</h4>
                  </div>
                  <FaPiggyBank size={24} className="text-success" />
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <small className="text-muted">Wallet Balance</small>
                <h4 className="mt-2">₹{wallet.toLocaleString()}</h4>
                <p className="text-muted mb-3">This grows with each new month’s saved amount.</p>
                <div className="d-flex align-items-center gap-2 text-muted">
                  <FaWallet />
                  <span>Wallet updates automatically from every saved budget entry.</span>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <small className="text-muted">Expense Ratio</small>
                <h4 className="mt-2">{spendingRatio}%</h4>
                <p className="text-muted mb-0">Expenses are {spendingRatio > 70 ? "high" : "within a healthy range"} compared to income.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="g-4 mt-1">
          <Col lg={6}>
            <Card className="shadow-sm h-100">
              <Card.Header>Transaction History</Card.Header>
              <ListGroup variant="flush">
                {entries.map((entry) => (
                  <ListGroup.Item key={entry.id} className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{entry.month}</strong>
                      <div className="text-muted small">{entry.description || "Budget entry"}</div>
                    </div>
                    <span className="text-success">₹{Number(entry.savings).toLocaleString()}</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>

          <Col lg={6}>
            <Card className="shadow-sm h-100">
              <Card.Header>Month-wise Savings</Card.Header>
              <Card.Body>
                {monthlySavings.map((item) => (
                  <div key={item.month} className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span>{item.month}</span>
                      <strong>₹{Number(item.amount).toLocaleString()}</strong>
                    </div>
                    <div className="progress" style={{ height: "8px" }}>
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: `${Math.min(100, Math.max(20, (Number(item.amount) / Math.max(1, Math.abs(savings) + 10000)) * 100))}%` }}
                      />
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;