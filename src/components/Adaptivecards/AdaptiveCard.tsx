import React, { useEffect, useRef } from "react";
import * as AdaptiveCards from "adaptivecards";

// Define the props type if needed
interface AdaptiveCardComponentProps {
  cardJson: any; // Replace 'any' with the appropriate type for your card JSON
}

const AdaptiveCardComponent: React.FC<AdaptiveCardComponentProps> = ({
  cardJson,
}) => {
  // Use HTMLDivElement to specify the type of element the ref will be attached to
  const cardElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardElementRef.current) {
      // Check that the ref is not null
      // Create an AdaptiveCard instance
      const adaptiveCard = new AdaptiveCards.AdaptiveCard();

      // Set the hostConfig property if you want to customize the look
      adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
        // Host Config JSON here
      });

      // Parse the JSON payload
      adaptiveCard.parse(cardJson);

      // If you have any action handlers, set them up here
      adaptiveCard.onExecuteAction = (action) => {
        if (action instanceof AdaptiveCards.OpenUrlAction) {
          window.open(action.url, "_blank");
        }
        // Handle other actions
      };

      // Render the card to the DOM
      const renderedCard = adaptiveCard.render();
      cardElementRef.current.innerHTML = ""; // Clear any existing content
      // Assert that renderedCard is an HTMLElement before appending
      if (renderedCard instanceof HTMLElement) {
        cardElementRef.current.appendChild(renderedCard);
      } else {
        console.error("Rendered card is undefined");
      }
    }
  }, [cardJson]); // This effect runs when the cardJson prop changes

  // The ref attribute attaches the cardElementRef to the div element
  return <div ref={cardElementRef}></div>;
};

export default AdaptiveCardComponent;
