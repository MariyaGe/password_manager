import {useState, useEffect} from 'react'

import './index.css'

const PasswordManager = ({allUserDetails}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')

  const [userDetails, setUserDetails] = useState([])
  const [filteredUserDetails, setFilteredUserDetails] = useState([])

  // Initialize userDetails and filteredUserDetails when allUserDetails changes
  useEffect(() => {
    setUserDetails(allUserDetails)
    setFilteredUserDetails(allUserDetails)
  }, [allUserDetails])

  const searchHandler = e => {
    const keyword = e.target.value.toLowerCase()
    setSearchKeyword(keyword)

    if (keyword === '') {
      // Reset filteredUserDetails to userDetails when search is cleared
      setFilteredUserDetails(userDetails)
    } else {
      // Filter userDetails based on the search keyword
      setFilteredUserDetails(
        userDetails.filter(user =>
          user.website.toLowerCase().includes(keyword),
        ),
      )
    }
  }

  const onDeleteHandler = userId => {
    // Remove the user from userDetails
    const updatedUserDetails = userDetails.filter(user => user.id !== userId)
    setUserDetails(updatedUserDetails)

    // Apply the same filter to filteredUserDetails to ensure consistency
    setFilteredUserDetails(
      filteredUserDetails.filter(user => user.id !== userId),
    )
  }

  return (
    <li>
      <div className="manage_password_header">
        <div>
          <h1 className="your_password_text">
            Your Passwords
            <p className="password_count">
              {userDetails.length === 0 ? 0 : userDetails.length}
            </p>
          </h1>
        </div>
        <div className="search_bar">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
            alt="search"
            className="search_logo"
          />
          <input
            type="search"
            onChange={searchHandler}
            className="search_input_field"
          />
        </div>
      </div>
      <hr className="divider" />
      <div className="show_password">
        <input
          type="checkbox"
          id="checkbox"
          onChange={() => setShowPassword(prevstate => !prevstate)}
        />
        <label htmlFor="checkbox">Show Passwords</label>
      </div>

      {filteredUserDetails.length === 0 ? (
        <div className="no_password_container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            alt="no passwords"
            className="no_password_img"
          />
          <p>No Passwords</p>
        </div>
      ) : (
        <div className="password_wrapper">
          {filteredUserDetails.map(userDetail => (
            <div className="password_card" key={userDetail.name}>
              <p className="name_icon">{userDetail.name[0].toUpperCase()}</p>

              <div className="password_details">
                <p className="website_name">{userDetail.website}</p>
                <p className="user_name">{userDetail.name}</p>
                <p className="password_text">
                  {showPassword ? (
                    userDetail.password
                  ) : (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png "
                      className="star_image"
                      alt="stars"
                    />
                  )}
                </p>
              </div>
              <div className="delete_icon_wrapper">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                  alt="delete"
                  className="delete_icon"
                  onClick={() => onDeleteHandler(userDetail.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </li>
  )
}
export default PasswordManager
