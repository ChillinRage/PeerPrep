import * as React from 'react';
import { OutlinedInput, InputLabel, Select, MenuItem, FormControl, Box, Chip } from '@mui/material';
import '../../styles/create-question-dialog.css';

const topics = [
  { value: 'Algorithms', label: 'Algorithms'},
  { value: 'Bit Manipulation', label: 'Bit Manipulation'},
  { value: 'Brainteaser', label: 'Brainteaser'},
  { value: 'Databases', label: 'Databases'},
  { value: 'Data Structures', label: 'Data Structures'},
  { value: 'Dynamic Programming', label: 'Dynamic Programming'},
  { value: 'Greedy', label: 'Greedy'},
  { value: 'Math', label: 'Math'},
  { value: 'Strings', label: 'Strings'},
];

const TopicsField = ({defaultTopics}) => {
  const [selectedTopics, setSelectedTopics] = React.useState(defaultTopics); // State to hold topics
  const handleTopicChange = (event) => setSelectedTopics(event.target.value);

  return (<>
    <FormControl margin='dense' fullWidth>
      <InputLabel id='topic-label'>Topics</InputLabel>
        <Select
          labelId='topic-label'
          id='topic'
          name='topic'
          value={selectedTopics}
          onChange={handleTopicChange}
          required
          multiple
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.4 }}>
              { selected.map((value) => (<Chip key={value} label={value} />)) }
            </Box>
          )}
          className="text-field"
        >
          {topics.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
    </FormControl>
  </>)
}

export default TopicsField;