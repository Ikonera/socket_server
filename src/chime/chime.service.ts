import { Injectable } from '@nestjs/common';
import { Chime, Endpoint } from "aws-sdk"
import { v4 as uuidv4 } from "uuid"

@Injectable()
export class ChimeService {
	private chime: Chime

	constructor() {
		this.chime = new Chime({ region: "eu-west-3" })
		this.chime.endpoint = new Endpoint("https://service.chime.aws.amazon.com")
	}

	getMeetingResponse = async () => {
		return await this.chime.createMeeting({
			ClientRequestToken: uuidv4(),
			MediaRegion: "eu-west-3",
		}).promise()
	}

	getAttendeeResponse = async () => {
		const meetingResponse = await this.getMeetingResponse()
		return await this.chime.createAttendee({
			MeetingId: meetingResponse.Meeting.MeetingId,
			ExternalUserId: uuidv4()
		}).promise()
	}
}
