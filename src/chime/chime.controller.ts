import {Controller, Get} from '@nestjs/common';
import {ChimeService} from "./chime.service";

@Controller('chime')
export class ChimeController {

	constructor(private readonly chimeService: ChimeService) {}

	@Get("/getMeetingResponse")
	async getMeetingResponse() {
		return await this.chimeService.getMeetingResponse()
	}

	@Get("/getAttendeeResponse")
	async getAttendeeResponse() {
		return await this.chimeService.getAttendeeResponse()
	}
}
