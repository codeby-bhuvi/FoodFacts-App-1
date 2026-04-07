import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Badge from '@mui/material/Badge'

import BookmarkIcon from '@mui/icons-material/Bookmark'

import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

function NavBar() {

  const savedCount = useSelector(state => state.saved.items.length)

  return (
    <AppBar position="sticky">

      <Toolbar sx={{ justifyContent: 'space-between' }}>

        <Typography variant="h6" fontWeight={800}>
          🥗 FoodFacts
        </Typography>

        <div style={{ display: 'flex', gap: '10px' }}>

          <Button component={NavLink} to="/" color="inherit">
            Search
          </Button>

          <Button
            component={NavLink}
            to="/saved"
            color="inherit"
            startIcon={
              <Badge badgeContent={savedCount} color="secondary">
                <BookmarkIcon />
              </Badge>
            }
          >
            Saved
          </Button>

        </div>

      </Toolbar>

    </AppBar>
  )
}

export default NavBar