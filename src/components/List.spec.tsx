import { render, fireEvent, waitForElementToBeRemoved, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import List from './list';

describe('List Component', () => {
  it('should render list items', () => {
    const { getByText, rerender, queryByText } = render(<List initialItems={['Beatriz', 'Fernando', 'Paulo', 'Luana', 'Vitoria']}/>)

    expect(getByText('Beatriz')).toBeInTheDocument();
    expect(getByText('Fernando')).toBeInTheDocument();
    expect(getByText('Paulo')).toBeInTheDocument();
    expect(getByText('Luana')).toBeInTheDocument();
    expect(getByText('Vitoria')).toBeInTheDocument();

    // rerender(<List initialItems={['Jaine']}/>)

    // expect(screen.getByText('Jaine')).toBeInTheDocument();
    // expect(screen.queryByText('Vitoria')).not.toBeInTheDocument();
  });

  it("should be able to add new item to the list", async () => {
    const { getByText, debug, getByPlaceholderText, findByText } = render(<List initialItems={[]}/>);
    
    const inputElement = getByPlaceholderText('novo item')
    const addButton = getByText("Adicionar");

    // debug();

    await userEvent.setup().type(inputElement, 'Novo');
    await userEvent.setup().click(addButton);

    // debug();

    // expect(getByText("Novo")).toBeInTheDocument();

    expect(await findByText('Novo')).toBeInTheDocument();


  });

  it("should be able to remove item from the list", async () => {
    const { getByText, getAllByText, queryByText } = render(<List initialItems={['Beatriz']}/>);
    
    // const addButton = getByText("Adicionar");
    const removeButton = getAllByText("Remover");

    await userEvent.setup().click(removeButton[0]);

    // await waitForElementToBeRemoved(() => {
    //   return getByText('Luana');
    // });

    await waitFor(() => {
      expect(queryByText('Beatriz')).not.toBeInTheDocument();
    })


  });
})