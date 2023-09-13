import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login() {
  return (
    <div style={{width:"30%", marginLeft:"30%", marginTop:"10%"}}>
     
      <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>User ID</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" rows={3} />
      </Form.Group>
      <Button>Login</Button>
    </Form>
    </div>
    
  );
}

export default Login;