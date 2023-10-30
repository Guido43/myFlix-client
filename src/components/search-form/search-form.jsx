import React, { useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import "./search-form.scss";

export const SearchForm = ({ onSearch }) => {
    const [searchName, setSearchName] = useState('');

    const handleSearchItem = (e) => {
        const newSearchName = e.target.value;
        setSearchName(newSearchName);

        if (newSearchName === '') {
            onSearch('');
        } else {
            onSearch(newSearchName);
        }
    };

    return (
        <Form>
            <FormControl
                className="mb-sm-2"
                id="search-bar"
                type="text"
                placeholder="Search movies by title..."
                value={searchName}
                onChange={handleSearchItem}
            />
        </Form>
    );
}