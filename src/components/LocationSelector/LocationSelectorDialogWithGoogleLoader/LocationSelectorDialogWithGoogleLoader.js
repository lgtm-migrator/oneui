import React from 'react';
import PropTypes from 'prop-types';
import { LoadScriptNext } from '@react-google-maps/api';
import { LoadingSpinner } from '../../../index';
import LocationSelectorDialog from '../LocationSelectorDialog';

const GOOGLE_API_LIBRARIES = ['places'];

function LocationSelectorDialogWithGoogleLoader(props) {
    const {
        /** Google props */
        apiKey,
        language,
        region,
        additionalGoogleProps,

        /** LocationCard props */
        minRadius,
        maxRadius,
        radiusStep,
        renderRadiusLabel,
        onRemoveLocation,
        doneLabel,

        /** LocationAutocomplete props */
        country,
        placeTypes,
        noSuggestionsPlaceholder,
        showCountryInSuggestions,
        onLocationAutocompleteError,

        /** Internal use */
        onCloseModal,
        onAddLocation,
        onUpdateLocation,
        selectedLocations,
        inputPlaceholder,
        getMarkers,
    } = props;

    return (
        <LoadScriptNext
            googleMapsApiKey={apiKey}
            language={language}
            region={region}
            loadingElement={<LoadingSpinner centerIn="parent" />}
            libraries={GOOGLE_API_LIBRARIES}
            {...additionalGoogleProps}
        >
            <LocationSelectorDialog
                inputPlaceholder={inputPlaceholder}
                minRadius={minRadius}
                maxRadius={maxRadius}
                radiusStep={radiusStep}
                renderRadiusLabel={renderRadiusLabel}
                onRemoveLocation={onRemoveLocation}
                doneLabel={doneLabel}
                country={country}
                placeTypes={placeTypes}
                noSuggestionsPlaceholder={noSuggestionsPlaceholder}
                showCountryInSuggestions={showCountryInSuggestions}
                onLocationAutocompleteError={onLocationAutocompleteError}
                onUpdateLocation={onUpdateLocation}
                selectedLocations={selectedLocations}
                getMarkers={getMarkers}
                onAddLocation={onAddLocation}
                onCloseModal={onCloseModal}
            />
        </LoadScriptNext>
    );
}

LocationSelectorDialogWithGoogleLoader.displayName = 'LocationSelectorDialogWithGoogleLoader';

LocationSelectorDialogWithGoogleLoader.propTypes = {
    /** Google api key */
    apiKey: PropTypes.string.isRequired,
    /** language in which suggestions should be displayed */
    language: PropTypes.string.isRequired,
    /** Regional setting for the map. By default Google uses US.
     * For details see: https://developers.google.com/maps/documentation/javascript/localization#Region
     */
    region: PropTypes.string,
    /** other props to pass to the google loader. For details see: https://react-google-maps-api-docs.netlify.com/#loadscriptnext */
    additionalGoogleProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    /** LocationSelectorDialog props */
    // ...LocationSelectorDialog.propTypes,
};

LocationSelectorDialogWithGoogleLoader.defaultProps = {
    additionalGoogleProps: {},
    region: undefined,
    // ...LocationSelectorDialog.defaultProps,
};

export default LocationSelectorDialogWithGoogleLoader;