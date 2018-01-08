import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Ticket from "../src/components/Ticket";

storiesOf("Ticket", module)
.add("standard ticket", () =>
<Ticket />);
