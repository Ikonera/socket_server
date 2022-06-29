import {Controller, Get, Post, Body} from '@nestjs/common';
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

	@Post("/getJoiningMeetingAttendee")
	async getJoiningMeetingAttendee(
		@Body("meetingId") meetingId: string
	) {
		return await this.chimeService.getJoiningMeetingAttendee(meetingId)
	}
}
