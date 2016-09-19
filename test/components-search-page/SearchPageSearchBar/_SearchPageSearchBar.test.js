import React from 'react';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag,
    Simulate
} from 'react-addons-test-utils';
import { expect } from 'chai';
import chai from 'chai'
import SearchPageSearchBar from '../../../app/src/components-search-page/SearchPageSearchBar/SearchPageSearchBar';

describe('SearchPageSearchBar', () => {
    
    it('should render with defaults', () => {
        const component = renderIntoDocument(<SearchPageSearchBar />);
        const buttonNodes = scryRenderedDOMComponentsWithTag(component, 'button');
        const inputNodes = scryRenderedDOMComponentsWithTag(component, 'input');

        expect(component.props).to.deep.equal({
            isLoading: false
        });

        expect(buttonNodes.length).to.equal(1);
        expect(inputNodes.length).to.equal(1);
        expect(buttonNodes[0].textContent).to.equal('Search');
    });

    it('should make a search when the user clicks the search button', () => {
        const onSearchSpy = chai.spy(() => {});
        const component = renderIntoDocument(<SearchPageSearchBar onSearch={onSearchSpy} />);
        const button = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        const input = scryRenderedDOMComponentsWithTag(component, 'input')[0];

        input.value = 'userNameMock';
        component.handleSearch = chai.spy(component.handleSearch);

        Simulate.click(button);

        expect(component.handleSearch).to.have.been.called.once();
        expect(onSearchSpy).to.have.been.called.once();
    });

    it('should display an inline error if tries to search without entering an user name', () => {
        const onSearchSpy = chai.spy(() => {});
        const component = renderIntoDocument(<SearchPageSearchBar onSearch={onSearchSpy} />);
        const button = scryRenderedDOMComponentsWithTag(component, 'button')[0];

        component.handleSearch = chai.spy(component.handleSearch);

        Simulate.click(button);

        expect(component.handleSearch).to.have.been.called.once();
        expect(onSearchSpy).to.have.not.been.called;
        expect(component.state).to.deep.equal({showInlineError: true});
    });
});