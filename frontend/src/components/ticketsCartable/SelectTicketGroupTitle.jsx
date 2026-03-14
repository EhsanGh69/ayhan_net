import { useState } from 'react'
import { Box, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Select } from '@mui/material'
import { Clear, Search as SearchIcon } from '@mui/icons-material'

import SearchToggleMenu from '../inputs/SearchToggleMenu'

export default function SelectTicketGroupTitle({ 
  ticketGroupsList, values, touched, errors, setGroupId, setFieldValue
}) {
  const [selectedGroup, setSelectedGroup] = useState('')
  const [showSearchGroups, setShowSearchGroups] = useState(false)

  return (
    <Box width={{ xs: "100%", md: "60%" }}
      border={showSearchGroups ? "1px solid gray" : "none"}
      p={showSearchGroups ? 1.5 : 0} borderRadius={showSearchGroups ? 2 : 0}>
      <Box display="flex" alignItems="center">
        <FormControl fullWidth
          error={touched.group && Boolean(errors.group)}>
          <InputLabel>گروه تیکت *</InputLabel>
          <Select
            value={selectedGroup ? selectedGroup : values.group ? values.group : ''}
            onChange={(e) => setFieldValue("group", e.target.value)}
            label="گروه تیکت"
            sx={{ textAlign: 'left' }}
          >
            {ticketGroupsList.map(group => (
              <MenuItem key={group.id} value={group.title}
                onClick={() => setGroupId(Number(group.id))}
              >
                {group.title}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {touched.group && errors.group}
          </FormHelperText>
        </FormControl>
        <IconButton
          sx={{ ml: 1, border: "1px solid purple" }}
          onClick={() => setShowSearchGroups(true)}
        >
          <SearchIcon color='secondary' />
        </IconButton>
      </Box>
      <Box display={showSearchGroups ? "flex" : "none"}
        alignItems="center">
        <SearchToggleMenu
          data={ticketGroupsList}
          field={{ title: "title", value: "title", set: "id" }}
          label="جستجو در گروه تیکت ها ..."
          setSelected={setSelectedGroup}
          setValue={(value) => setFieldValue("group", value)}
          setHandler={(groupId) => setGroupId(groupId)}
        />
        <IconButton
          sx={{ ml: 1, border: "1px solid red" }}
          onClick={() => setShowSearchGroups(false)}
        >
          <Clear color='error' />
        </IconButton>
      </Box>
    </Box>
  )
}

