import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const ProfileModel = ({show,handleClose,profile,onLogout}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
            <Modal.Title> User Profile</Modal.Title>
        </Modal.Header>
<Modal.Body>
    <p><strong>UserName : </strong><br />{profile?.username}</p>
    <p><strong>Email : </strong><br />{profile?.email}</p>
</Modal.Body>
<Modal.Footer>
    <Button variant="secondary" onClick={onLogout}>
        Logout
    </Button>
</Modal.Footer>
    </Modal>
  )
}

export default ProfileModel