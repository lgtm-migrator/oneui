import * as React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { bem } from '../../utils';
import { AutosuggestDeprecated } from '../AutosuggestDeprecated';
import { ListItem } from '../List/ListItem';
import { MarkedText, Text } from '../Text';
import { useDebounce } from '../../hooks';
import POWERED_BY_GOOGLE_ON_WHITE from './images/powered_by_google_on_white.png';
import POWERED_BY_GOOGLE_ON_WHITE_2X from './images/powered_by_google_on_white@2x.png';
import POWERED_BY_GOOGLE_ON_WHITE_3X from './images/powered_by_google_on_white@3x.png';
import styles from './LocationAutocomplete.scss';

interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onError'> {
    /** input field ref */
    inputRef?: React.RefObject<HTMLInputElement>;
    /** to be shown in the input field when no value is typed */
    inputPlaceholder: string;
    /** default input value */
    defaultInputValue?: string;
    /** to be shown when no suggestions are available */
    noSuggestionsPlaceholder: string;
    /** trigger of the initial focus of the input field */
    isFocused?: boolean;
    /** label for the Clear button */
    clearLabel?: string;
    /** defines if there's a single location to select in component */
    singleLocation?: boolean;
    /** callback to be called with selected value. */
    onSelectionChange: (value: google.maps.places.AutocompletePrediction) => void;
    /** restrict predictions to country/countries.
     * For details see: https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#ComponentRestrictions
     */
    country?: string | string[];
    /** type of locations that should be searched for.
     * For details see: https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest.types
     */
    placeTypes?: string[];
    /** show state and country in suggestions list */
    showCountryInSuggestions?: boolean;
    /** function to remove all locations */
    onRemoveAllLocations?: () => void;
    /** function to be executed if error occurs while fetching suggestions */
    onError?: (error: google.maps.places.PlacesServiceStatus) => void;
    /** To hide powered by google logo. For legal reasons only set it to true if Google map is displayed on the same screen as this component! */
    hidePoweredByGoogleLogo?: boolean;
}

const { elem } = bem('LocationAutocomplete', styles);

const DEBOUNCE_DELAY = 350;
const ACCEPTABLE_API_STATUSES = ['OK', 'NOT_FOUND', 'ZERO_RESULTS'];

const LocationAutocomplete: React.FC<Props> = (props) => {
    const {
        inputRef,
        isFocused,
        onSelectionChange,
        defaultInputValue,
        inputPlaceholder,
        clearLabel,
        noSuggestionsPlaceholder,
        country = '',
        placeTypes,
        singleLocation,
        showCountryInSuggestions,
        onRemoveAllLocations,
        onError,
        hidePoweredByGoogleLogo,
        ...rest
    } = props;

    const [storage] = React.useState({ latestInputValue: '' });
    const [suggestionsList, setSuggestionsList] = React.useState<
        google.maps.places.AutocompletePrediction[]
    >([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const debouncedInputValue = useDebounce(inputValue, DEBOUNCE_DELAY);

    // Suggestion functions
    const resetSuggestionsList = () => setSuggestionsList([]);
    const suggestionToString = (suggestion) => (suggestion ? suggestion.description : '');

    React.useEffect(() => {
        if (debouncedInputValue) {
            // Putting latest debounced input value to the storage
            storage.latestInputValue = debouncedInputValue;

            const service = new window.google.maps.places.AutocompleteService();

            service.getPlacePredictions(
                {
                    input: debouncedInputValue,
                    types: placeTypes,
                    componentRestrictions: { country },
                },
                (predictions, status) => {
                    // if this function was called with outdated input value, return early
                    if (debouncedInputValue !== storage.latestInputValue) return;

                    if (ACCEPTABLE_API_STATUSES.includes(status)) {
                        setSuggestionsList(predictions);
                    } else {
                        // TODO: check desired behaviour with Carlo
                        // currently the UI will look same as when no suggestions found
                        resetSuggestionsList();
                        if (onError) {
                            onError(status);
                        }
                    }
                    setIsLoading(false);
                }
            );
        } else {
            resetSuggestionsList();
        }
    }, [country, debouncedInputValue, onError, placeTypes, storage.latestInputValue]);

    if (!(window.google && window.google.maps && window.google.maps.places)) {
        // TODO: clarify with Carlo how to handle errors
        const errorMessage =
            'Google Maps Places API was not found on the page. Before using this component, make sure to load the places API';
        console.error(errorMessage);
        return (
            <Text context="bad" inline>
                Error while rendering LocationAutocomplete
            </Text>
        );
    }

    const handleInputValueChange = (value) => {
        setInputValue(value);
        if (value) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
            resetSuggestionsList();

            if (singleLocation) {
                onRemoveAllLocations?.();
            }
        }
    };

    const handleSelection = (value) => {
        resetSuggestionsList();
        setInputValue(singleLocation ? value : '');
        onSelectionChange(value);
    };

    // eslint-disable-next-line react/display-name
    const renderListPoweredByGoogle = ({ listInputValue, getItemProps, highlightedIndex }) => {
        const elems = suggestionsList.map((item, index) => (
            <ListItem
                key={suggestionToString(item)}
                {...getItemProps({
                    item,
                    index,
                    isHighlighted: highlightedIndex === index,
                })}
            >
                <MarkedText marker={listInputValue} inline>
                    {showCountryInSuggestions
                        ? suggestionToString(item)
                        : item.structured_formatting.main_text}
                </MarkedText>
            </ListItem>
        ));

        if (!hidePoweredByGoogleLogo) {
            elems.unshift(
                <img
                    key="powered by google logo"
                    {...elem('poweredByGoogleImage', props)}
                    src={POWERED_BY_GOOGLE_ON_WHITE}
                    srcSet={`${POWERED_BY_GOOGLE_ON_WHITE}, ${POWERED_BY_GOOGLE_ON_WHITE_2X} 2x, ${POWERED_BY_GOOGLE_ON_WHITE_3X} 3x`}
                    alt="Powered by Google"
                    data-list-exception
                />
            );
        }

        return elems;
    };

    return (
        <AutosuggestDeprecated
            getSuggestions={suggestionsList}
            suggestionToString={suggestionToString}
            isLoading={isLoading}
            isFocused={isFocused}
            defaultInputValue={defaultInputValue}
            inputPlaceholder={inputPlaceholder}
            showClearButton={singleLocation}
            clearTitle={clearLabel}
            noSuggestionsPlaceholder={noSuggestionsPlaceholder}
            listRenderer={renderListPoweredByGoogle}
            saveSelectedValueToInput={singleLocation}
            onBlur={resetSuggestionsList}
            onInputValueChange={handleInputValueChange}
            onSelectionChange={handleSelection}
            onClearAllSelected={onRemoveAllLocations}
            iconNode={<FaMapMarkerAlt {...elem('icon', props)} />}
            {...rest}
            inputRef={inputRef}
        />
    );
};

LocationAutocomplete.displayName = 'LocationAutocomplete';

LocationAutocomplete.defaultProps = {
    country: '',
    singleLocation: false,
    defaultInputValue: '',
    clearLabel: '',
    placeTypes: ['(regions)'],
    isFocused: false,
    showCountryInSuggestions: false,
    hidePoweredByGoogleLogo: false,
};

export { LocationAutocomplete, Props as LocationAutocompleteProps };