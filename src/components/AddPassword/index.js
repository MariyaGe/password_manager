import './index.css'
import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordManager from '../PasswordManager'

const AddPassword = () => {
  const [userDetails, setUserDetails] = useState([
    // {
    //   id: uuidv4(),
    //   website: '',
    //   name: '',
    //   password: '',
    // },
  ])

  const addPasswordHandler = e => {
    e.preventDefault()

    // Create a FormData object from the form
    const formData = new FormData(e.target)

    // Convert FormData to a plain object
    const newDetails = {
      id: uuidv4(),
      website: formData.get('website'),
      name: formData.get('name'),
      password: formData.get('password'),
    }

    // Update state with new details
    setUserDetails(prevDetails => [...prevDetails, newDetails])

    // Optionally, reset the form fields
    e.target.reset()
  }
  return (
    <div className="password_manager_page">
      <div className="password_manager_content">
        <div className="app_logo_wrapper">
          <img
            className="app_logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png "
            alt="app logo"
          />
        </div>
        <div className="password_container">
          <form onSubmit={addPasswordHandler}>
            <div className="add_password_field">
              <h1 className="add_new_password_heading">Add New Password</h1>
              <div className="add_password_input_field">
                <div className="input_field_wrapper">
                  <img
                    className="input_field_logo"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                  />
                  <div className="verical_line" />
                  <input
                    type="text"
                    className="input_field"
                    placeholder="Enter Website"
                    name="website"
                  />
                </div>
                <div className="input_field_wrapper">
                  <img
                    className="input_field_logo"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                  />
                  <div className="verical_line" />
                  <input
                    type="text"
                    className="input_field"
                    placeholder="Enter Username"
                    name="name"
                  />
                </div>
                <div className="input_field_wrapper">
                  <img
                    className="input_field_logo"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                  />
                  <div className="verical_line" />
                  <input
                    type="password"
                    className="input_field"
                    placeholder="Enter Password"
                    name="password"
                  />
                </div>
              </div>
              <div className="add_button_wrpper">
                <button
                  type="submit"
                  className="add_button"
                  data-testid="delete"
                >
                  Add
                </button>
              </div>
            </div>
          </form>
          <div className="password_manager_image_wrapper">
            <img
              className="password_manager_image"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
            />
          </div>
        </div>

        <ul className="manage_password_container  manage_password_container">
          <PasswordManager allUserDetails={userDetails} />
        </ul>
      </div>
    </div>
  )
}
export default AddPassword
