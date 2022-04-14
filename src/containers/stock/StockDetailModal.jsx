/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { RemoveableLabel } from '@components/label/RemoveableLabel';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { Modal, ModalBody } from 'reactstrap';
import Button from 'reactstrap-button-loader';

export const StockDetailModal = ({ isOpen, toggle }) => {
  const { selectedStock } = useSelector(state => state.stock);
  const hashtagsList = useSelector(state => state.hashtag);

  const [hashtags, setHashtags] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleAddHashtag = item => {
    setSearchText('');

    if (!hashtags.filter(e => e.id === item.id).length) {
      const newItem = hashtags.concat(item);
      setHashtags(newItem);
    }
  };

  const handleRemoveHashtag = item => {
    setHashtags(prev => prev.filter(hashtag => hashtag.id !== item.id));
  };

  useEffect(() => {
    setHashtags(selectedStock.stock_category || []);
  }, [selectedStock.stock_category]);

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered size="lg">
      <ModalBody className="p-4">
        <div className="d-flex align-items-center">
          <img
            src={selectedStock.file?.url}
            alt={selectedStock.name}
            width={80}
            height={80}
            className="rounded-circle"
            style={{ objectFit: 'cover' }}
          />

          <div className="ml-4 d-flex align-items-end w-100">
            <div className="flex-grow-1">
              <h5 className="m-0">{selectedStock.company_name}</h5>
              <span>{selectedStock.name}</span>
            </div>
            <span className="flex-grow-1">
              Sektor:{' '}
              {selectedStock.stock_sector
                ? selectedStock.stock_sector?.map(sector => `${sector.name} `)
                : ''}
            </span>
          </div>
        </div>

        <h5 className="mt-4 mb-3">Related Hashtags</h5>

        <ReactSearchAutocomplete
          styling={{
            boxShadow: 'none',
            borderRadius: '20px'
          }}
          inputSearchString={searchText}
          items={hashtagsList.data}
          onSearch={setSearchText}
          onSelect={handleAddHashtag}
        />

        <div className="mt-3">
          {hashtags?.map(hashtag => (
            <RemoveableLabel
              key={hashtag.id}
              text={hashtag.name}
              removable
              onRemove={() => handleRemoveHashtag(hashtag)}
            />
          ))}
        </div>

        <div className="d-flex flex-row flex-grow-1 justify-content-end">
          <Button
            type="submit"
            color="secondary"
            className="mt-5 mb-3"
            onClick={toggle}
            style={{ padding: '0.6rem 3.5rem' }}
          >
            Batal
          </Button>
          <Button
            type="submit"
            color="danger"
            className="mt-5 mb-3 ml-3"
            style={{ padding: '0.6rem 3.5rem' }}
          >
            Simpan
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};
